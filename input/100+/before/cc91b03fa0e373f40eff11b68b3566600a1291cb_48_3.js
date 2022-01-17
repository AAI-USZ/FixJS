function(frame, error, hitErrorBreakpoint)
    {
        var context = this.breakContext;
        delete this.breakContext;

        // If the script panel is disabled, Firebug can't break on error.
        if (!Firebug.PanelActivation.isPanelEnabled("script"))
            return 0;

        try
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("debugger.onError: "+error.errorMessage+" in "+
                    (context?context.getName():"no context"), error);

            if (reTooMuchRecursion.test(error.errorMessage))
                frame = FBS.discardRecursionFrames(frame);

            Firebug.errorStackTrace = StackFrame.getCorrectedStackTrace(frame, context);

            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("debugger.onError; break=" + Firebug.breakOnErrors +
                    ", errorStackTrace:", Firebug.errorStackTrace);

            delete context.breakingCause;

            if (Firebug.breakOnErrors || hitErrorBreakpoint)
            {
                var eventOrigin = Wrapper.unwrapIValue(frame.executionContext.globalObject);
                if (!eventOrigin)
                    return 0;

                // Check if the eventOrigin (window) comes from this context.
                var eventOriginIndex = -1;
                for (var i=0; i<context.windows.length; i++)
                {
                    if (Wrapper.getContentView(context.windows[i]) == eventOrigin) {
                        eventOriginIndex = i;
                        break;
                    }
                }

                // Bail out if the event that lead the error is not cause by code in this context.
                if (eventOriginIndex < 0)
                {
                    if (FBTrace.DBG_ERRORS)
                        FBTrace.sysout("debugger.onError; error is not from this context: (" +
                            eventOriginIndex + ") " + frame.script.tag+"@"+frame.script.fileName);
                    return 0;
                }

                var sourceFile = Firebug.SourceFile.getSourceFileByScript(context, frame.script);
                if (!sourceFile)
                {
                    if (FBTrace.DBG_ERRORS)
                        FBTrace.sysout("debugger.breakon Errors no sourceFile for "+
                            frame.script.tag+"@"+frame.script.fileName);
                    return;
                }

                var analyzer = sourceFile.getScriptAnalyzer(frame.script);
                var lineNo = analyzer.getSourceLineFromFrame(context, frame);

                var doBreak = true;
                FBS.enumerateBreakpoints(sourceFile.href, {call: function(url, line, props, scripts)
                {
                    if (FBTrace.DBG_FBS_BP)
                        FBTrace.sysout("debugger.breakon Errors bp "+url+"@"+line+" scripts "+
                            (scripts?scripts.length:"none"));

                    if (line === lineNo)
                        doBreak = false;
                }});

                if (FBTrace.DBG_BP)
                    FBTrace.sysout("debugger.breakon Errors " + doBreak + " for " +
                        sourceFile.href + "@" + lineNo);

                if (doBreak)
                {
                    context.breakingCause =
                    {
                        title: Locale.$STR("Break on Error"),
                        message: error.message,
                        copyAction: Obj.bindFixed(FirebugReps.ErrorMessage.copyError,
                            FirebugReps.ErrorMessage, error),

                        skipAction: function addSkipperAndGo()
                        {
                            // a breakpoint that never hits, but prevents BON for errors
                            var bp = Firebug.Debugger.setBreakpoint(sourceFile, lineNo);
                            FBS.disableBreakpoint(sourceFile.href, lineNo);

                            if (FBTrace.DBG_BP)
                                FBTrace.sysout("debugger.breakon Errors set "+sourceFile.href+"@"+
                                    lineNo+" tag: "+frame.script.tag, bp);

                            Firebug.Debugger.resume(context);
                        },
                    };
                }
            }
        }
        catch (exc)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("debugger.onError getCorrectedStackTrace FAILED: "+exc, exc);
        }

        var hookReturn = Firebug.connection.dispatch("onError",[context, frame, error]);

        if (!context.breakingCause)
            return 0;

        if (Firebug.breakOnErrors)
        {
            // Switch of Break on Next tab lightning.
            var panel = context.getPanel("console", true);
            //Firebug.Breakpoint.updatePanelTab(panel, false);

            return -1;  // break
        }

        if (hookReturn)
            return hookReturn;

        return -2; /* let firebug service decide to break or not */
    }
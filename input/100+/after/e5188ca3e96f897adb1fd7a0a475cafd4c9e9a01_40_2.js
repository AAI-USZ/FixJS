function(frame, context, newestFrameXB)
{
    if (frame.isNative || frame.isDebugger)
    {
        var excuse = (frame.isNative) ?  "(native)" : "(debugger)";
        if (FBTrace.DBG_STACK)
            FBTrace.sysout("lib.getStackFrame "+excuse+" frame\n");

        return new StackFrame.StackFrame({href: excuse}, 0, excuse, [],
            null, null, context, newestFrameXB);
    }
    try
    {
        var sourceFile = Firebug.SourceFile.getSourceFileByScript(context, frame.script);
        if (sourceFile)
        {
            var url = sourceFile.href;
            var analyzer = sourceFile.getScriptAnalyzer(frame.script);

            var lineNo = analyzer.getSourceLineFromFrame(context, frame);
            var fncSpec = analyzer.getFunctionDescription(frame.script, context, frame);
            if (!fncSpec.name || fncSpec.name === "anonymous")
            {
                fncSpec.name = StackFrame.guessFunctionName(url, frame.script.baseLineNumber, context);
                if (!fncSpec.name)
                    fncSpec.name = "?";
            }

            if (FBTrace.DBG_STACK)
                FBTrace.sysout("lib.getStackFrame "+fncSpec.name, {sourceFile: sourceFile,
                    script: frame.script, fncSpec: fncSpec, analyzer: analyzer});

            return new StackFrame.StackFrame(sourceFile, lineNo, fncSpec.name, fncSpec.args, frame,
                frame.pc, sourceFile.context, newestFrameXB);
        }
        else
        {
            if (FBTrace.DBG_STACK)
                FBTrace.sysout("lib.getStackFrame NO sourceFile tag@file:"+frame.script.tag+
                    "@"+frame.script.fileName, frame.script.functionSource);

            var script = frame.script;
            return new StackFrame.StackFrame({href: Url.normalizeURL(script.fileName)}, frame.line,
                script.functionName, [], frame, frame.pc, context, newestFrameXB);
        }
    }
    catch (exc)
    {
        if (FBTrace.DBG_STACK)
            FBTrace.sysout("getStackFrame fails: "+exc, exc);
        return null;
    }
}
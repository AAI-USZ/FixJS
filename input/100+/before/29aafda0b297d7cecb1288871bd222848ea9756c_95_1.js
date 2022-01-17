function(frame, context)
{
    try
    {
        var trace = new StackFrame.StackTrace();
        var newestFrame = null;
        var nextOlderFrame = null;
        for (; frame && frame.isValid; frame = frame.callingFrame)
        {
            if (!(Options.get("filterSystemURLs") &&
                Url.isSystemURL(Url.normalizeURL(frame.script.fileName))))
            {
                var stackFrame = StackFrame.getStackFrame(frame, context, newestFrame);
                if (stackFrame)
                {
                    if (!newestFrame)
                        newestFrame = stackFrame;

                    if (context.currentFrame && context.currentFrame === frame)
                        trace.currentFrameIndex = trace.length;

                    stackFrame.setCallingFrame(nextOlderFrame, trace.frames.length);
                    nextOlderFrame = stackFrame;
                    trace.frames.push(stackFrame);
                }
            }
            else
            {
                if (FBTrace.DBG_STACK)
                    FBTrace.sysout("lib.getCorrectedStackTrace isSystemURL frame.script.fileName "+
                        frame.script.fileName+"\n");
            }
        }

        if (trace.frames.length > 100)  // TODO in the loop above
        {
            var originalLength = trace.frames.length;
            trace.frames.splice(50, originalLength - 100);
            var excuse = "(eliding "+(originalLength - 100)+" frames)";

            trace.frames[50] = new StackFrame.StackFrame({href: excuse}, 0, excuse,
                [], null, null, context);
        }

    }
    catch (exc)
    {
        if (FBTrace.DBG_ERRORS)
            FBTrace.sysout("getCorrectedStackTrace FAILS "+exc, exc);
    }
    return trace;
}
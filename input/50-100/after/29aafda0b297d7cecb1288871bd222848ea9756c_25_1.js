function(script, context, frame)
    {
        if (frame)
        {
            var name = frame.name;
            var args = StackFrame.getFunctionArgValues(frame);
        }
        else
        {
            var name = script.functionName;
            var args = [];
        }

        if (name == "anonymous")
        {
            var name = StackFrame.guessFunctionName(this.sourceFile.href,
                this.getBaseLineNumberByScript(script), context);
        }

        return {name: name, args: args};
    }
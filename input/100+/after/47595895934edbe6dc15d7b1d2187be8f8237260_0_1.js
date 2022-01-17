function () {
        var done = this.async();

        try {
            doBuildIndex();
        } catch (error) {
            var frames = getStackFrames(error);

            var fileName = frames[0].getFileName();
            var line = frames[0].getLineNumber();
            var column = frames[0].getColumnNumber();
            var code = error.name;
            var message = error.message;

            // Visual Studio error format: http://msdn.microsoft.com/en-us/library/yxkt8b26%28v=vs.110%29.aspx
            console.error(fileName + "(" + line + "," + column + "): error " + code + ": " + message);
        } finally {
            // For some reason the errors don't make it to the UI unless you delay for a bit.
            setTimeout(done, 10);
        }
    }
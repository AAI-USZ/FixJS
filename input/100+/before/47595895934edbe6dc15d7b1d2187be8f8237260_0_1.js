function () {
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
        }
    }
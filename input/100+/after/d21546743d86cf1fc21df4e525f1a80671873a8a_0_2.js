function processFile(relativeFilePath, options) {
        var input = api.readFile(relativeFilePath),
            ruleset = filterRules(options),
            result = CSSLint.verify(input, gatherRules(options, ruleset)),
            formatter = CSSLint.getFormatter(options.format || "text"),
            messages = result.messages || [],
            output,
            exitCode = 0;

        if (!input) {
            if (formatter.readError) {
                api.print(formatter.readError(relativeFilePath, "Could not read file data. Is the file empty?"));
            } else {
                api.print("csslint: Could not read file data in " + relativeFilePath + ". Is the file empty?");
            }
            exitCode = 1;
        } else {
            //var relativeFilePath = getRelativePath(api.getWorkingDirectory(), fullFilePath);
            options.fullPath = api.getFullPath(relativeFilePath);
            output = formatter.formatResults(result, relativeFilePath, options);
            if (output){
                api.print(output);
            }
            
            if (messages.length > 0 && pluckByType(messages, "error").length > 0) {
                exitCode = 1;
            }
        }
        
        return exitCode;
    }
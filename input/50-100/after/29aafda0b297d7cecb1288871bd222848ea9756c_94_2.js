function(url, line, context)
{
    var sourceFile = context.sourceFileMap[url];
    if (sourceFile)
    {
        var scripts = sourceFile.getScriptsAtLineNumber(line);
        if (scripts)
        {
            // TODO try others?
            var script = scripts[0];
            var analyzer = sourceFile.getScriptAnalyzer(script);

            // Some analyzers don't implement this method.
            if (analyzer.getBaseLineNumberByScript)
                line = analyzer.getBaseLineNumberByScript(script);
        }
    }

    return StackFrame.guessFunctionName(url, line-1, context);
}
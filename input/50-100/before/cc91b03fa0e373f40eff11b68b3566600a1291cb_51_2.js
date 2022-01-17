function(url, line, context)
{
    var sourceFile = context.sourceFileMap[url];
    if (sourceFile)
    {
        var scripts = sourceFile.getScriptsAtLineNumber(line);
        if (scripts)
        {
            var script = scripts[0]; // TODO try others?
            var analyzer = sourceFile.getScriptAnalyzer(script);
            line = analyzer.getBaseLineNumberByScript(script);
        }
    }

    return StackFrame.guessFunctionName(url, line-1, context);
}
function processModules(src, options, style) {
    if (options.module) {
        src = 'module ' + options.module + '{\n' + src + '\n}';
    }

    var ast = parse(src, { loc: true });

    var modules = [];

    traverse(ast, function(node) {
        if (node.type === Syntax.ModuleDeclaration) {
            modules.push(node);
            return false;
        }
    });

    var lines = src.split('\n');

    modules.forEach(function(mod) {

        options.indent = detectIndent(mod, lines);

        var imps = [];

        traverse(mod, function(node) {
            if (node.type === Syntax.ModuleDeclaration && node !== mod) {
                return false;
            } else if (node.type === Syntax.ImportDeclaration &&
                       node.specifiers[0].type !== Syntax.Glob) {
                imps.push(node);
            }
        });

        var moduleStartLine = mod.loc.start.line - 1;
        var moduleStartColumn = mod.loc.start.column;
        var moduleEndLine = mod.loc.end.line - 1;
        var moduleEndColumn = mod.loc.end.column;
        var bodyStartColumn = mod.body.loc.start.column;
        var bodyEndColumn = mod.body.loc.end.column;

        // Modify the end first in case it's on the same line as the start.
        lines[moduleEndLine] = splice(
            lines[moduleEndLine],
            bodyEndColumn - 1,
            1, // Delete the closing brace.
            style.endModule(mod, options));

        lines[moduleStartLine] = splice(
            lines[moduleStartLine],
            moduleStartColumn,
            bodyStartColumn - moduleStartColumn + 1, // Delete from start of module to opening brace.
            style.startModule(mod, imps, options));

        imps.forEach(function(imp) {
            var importStartLine = imp.loc.start.line - 1;
            var importStartColumn = imp.loc.start.column;
            var importEndColumn = imp.loc.end.column;
            lines[importStartLine] = splice(
                lines[importStartLine],
                importStartColumn,
                importEndColumn - importStartColumn,
                style.importDeclaration(mod, imp, options));
        });

        var exps = [];

        traverse(mod, function(node) {
            if (node.type === Syntax.ModuleDeclaration && node !== mod) {
                return false;
            } else if (node.type === Syntax.ExportDeclaration) {
                exps.push(node);
            }
        });

        exps.forEach(function(exp) {
            var exportStartLine = exp.loc.start.line - 1;
            var exportStartColumn = exp.loc.start.column;
            var declarationStartColumn = exp.declaration.loc.start.column;
            lines[exportStartLine] = splice(
                lines[exportStartLine],
                exportStartColumn,
                declarationStartColumn - exportStartColumn, // Delete the export keyword.
                ''); // Nothing to insert.
        });

        if (exps.length) {
            lines[moduleEndLine] = splice(
                lines[moduleEndLine],
                moduleEndColumn - 1,
                0,
                style.exports(mod, exps, options));
        }
    });

    src = lines.join('\n');

    return src;
}
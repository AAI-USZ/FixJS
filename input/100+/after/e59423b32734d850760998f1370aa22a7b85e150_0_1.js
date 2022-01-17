function processShorthands(src, options) {
    var ast = parse(src, { loc: true });

    var shorthands = [];

    traverse(ast, function(node) {
        if (node.type === Syntax.Property && node.shorthand) {
            shorthands.push(node);
        }
    });

    var lines = src.split('\n');

    for (var i = shorthands.length - 1; i >= 0; i--) {
        var prop = shorthands[i];
        var line = prop.value.loc.end.line - 1;
        var col = prop.value.loc.end.column;

        lines[line] = splice(
            lines[line],
            col,
            0, // Delete nothing.
            ': ' + prop.value.name);
    }

    return lines.join('\n');
}
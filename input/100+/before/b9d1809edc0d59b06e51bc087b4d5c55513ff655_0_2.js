function (node, path) {
        var start, end;
        if (node.type !== esprima.Syntax.Identifier) {
            return;
        }
        if (node.name === id) {
            start = {
                line: node.loc.start.line - 1,
                ch: node.loc.start.column
            };
            end = {
                line: node.loc.end.line - 1,
                ch: node.loc.end.column
            };
            markers.push(editor.markText(start, end, 'identifier'));
        }
    }
function trackCursor(editor) {
    'use strict';

    var pos, code, node, id;

    markers.forEach(function (marker) {
        marker.clear();
    });
    markers = [];

    if (syntax === null) {
        parse();
        if (syntax === null) {
            return;
        }
    }

    pos = editor.indexFromPos(editor.getCursor());
    code = editor.getValue();

    // Executes visitor on the object and its children (recursively).
    function traverse(object, visitor, master) {
        var key, child, parent, path;

        parent = (typeof master === 'undefined') ? [] : master;

        if (visitor.call(null, object, parent) === false) {
            return;
        }
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                child = object[key];
                path = [ object ];
                path.push(parent);
                if (typeof child === 'object' && child !== null) {
                    traverse(child, visitor, path);
                }
            }
        }
    }

    traverse(syntax, function (node, path) {
        var start, end;
        if (node.type !== esprima.Syntax.Identifier) {
            return;
        }
        if (pos >= node.range[0] && pos <= node.range[1]) {
            start = {
                line: node.loc.start.line - 1,
                ch: node.loc.start.column
            };
            end = {
                line: node.loc.end.line - 1,
                ch: node.loc.end.column
            };
            markers.push(editor.markText(start, end, 'identifier'));
            id = node;
        }
    });

    if (typeof id === 'undefined') {
        return;
    }

    traverse(syntax, function (node, path) {
        var start, end;
        if (node.type !== esprima.Syntax.Identifier) {
            return;
        }
        if (node !== id && node.name === id.name) {
            start = {
                line: node.loc.start.line - 1,
                ch: node.loc.start.column
            };
            end = {
                line: node.loc.end.line - 1,
                ch: node.loc.end.column
            };
            markers.push(editor.markText(start, end, 'highlight'));
        }
    });
}
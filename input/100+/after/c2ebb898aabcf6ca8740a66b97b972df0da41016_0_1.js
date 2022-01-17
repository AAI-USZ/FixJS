function transpile(code) {
    'use strict';

    var result, tree, operations, i, op;

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

    tree = esprima.parse(code, { range: true, raw: true });

    operations = [];

    traverse(tree, function (node, path) {
        var pos, text;
        if (node.type !== esprima.Syntax.Property) {
            return;
        }
        if (typeof node.shorthand !== 'undefined' && node.shorthand) {
            pos = node.key.range[1];
            text = node.key.name;
            if (typeof text === 'undefined') {
                text = node.key.raw;
            }
            text = ': ' + text;
            operations.push({
                pos: pos,
                text: text
            });
        }
    });

    operations.sort(function (a, b) { return b.pos - a.pos; });

    result = code;
    for (i = 0; i < operations.length; i += 1) {
        op = operations[i];
        result = result.slice(0, op.pos) + op.text + result.slice(op.pos, result.length);
    }

    result = harmonizr.harmonize(result, { style: 'revealing' });

    return result;
}
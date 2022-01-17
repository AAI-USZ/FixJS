function testParse(code, syntax) {
    'use strict';
    var expected, tree, actual, options, StringObject, i, len, err;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        comment: (typeof syntax.comments !== 'undefined'),
        range: true,
        loc: true,
        tokens: (typeof syntax.tokens !== 'undefined'),
        raw: true,
        tolerant: (typeof syntax.errors !== 'undefined')
    };

    if (typeof syntax.comments !== 'undefined') {
        if (syntax.comments.length > 0) {
            options.range = (typeof syntax.comments[0].range !== 'undefined');
            options.loc = (typeof syntax.comments[0].loc !== 'undefined');
        }
    }

    expected = JSON.stringify(syntax, null, 4);
    try {
        tree = esprima.parse(code, options);
        tree = (options.comment || options.tokens || options.tolerant) ? tree : tree.body[0];

        if (options.tolerant) {
            for (i = 0, len = tree.errors.length; i < len; i += 1) {
                tree.errors[i] = errorToObject(tree.errors[i]);
            }
        }

        actual = JSON.stringify(tree, adjustRegexLiteral, 4);

        // Only to ensure that there is no error when using string object.
        esprima.parse(new StringObject(code), options);

    } catch (e) {
        throw new NotMatchingError(expected, e.toString());
    }
    if (expected !== actual) {
        throw new NotMatchingError(expected, actual);
    }
}
function (args) {
    var lineCount = parseInt(args[0], 10),
        opts  = (function (arg) {
            switch (arg) {
            case undefined:
            case '':
                return {};
            default:
                return eval('(' + arg + ')');
            }
        })(args[1]);

    if (isNaN(lineCount)) {
        print('jshint: Must provide number of lines to read from stdin.');
        quit();
    }

    var input = readline();

    for (var i = 0; i < lineCount; ++i) {
        input += '\n' + readline();
    }

    var results = [],
        err;

    try
    {
        if (!JSHINT(input, opts)) {
            for (i = 0; err = JSHINT.errors[i]; i++) {
                results.push(err);
            }
        }
    }
    catch (e) {
        results.push({line: 1, character: 1, reason: e.message});

        for (i = 0; err = JSHINT.errors[i]; i++) {
            results.push(err);
        }
    }

    print(JSON.stringify(results));
    quit();
}
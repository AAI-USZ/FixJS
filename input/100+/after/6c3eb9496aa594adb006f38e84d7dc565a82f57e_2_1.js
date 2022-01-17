function hint(code, config)
{
    var results = [];

    try {
        if (!_jshint.JSHINT(code, config)) {
            _jshint.JSHINT.errors.forEach(function (error) {
                if (error) {
                    results.push(error);
                }
            });
        }
    }
    catch (e) {
        results.push({line: 1, character: 1, reason: e.message});

        _jshint.JSHINT.errors.forEach(function (error) {
            if (error) {
                results.push(error);
            }
        });
    }

    _util.puts(JSON.stringify(results));
    process.exit(0);
}
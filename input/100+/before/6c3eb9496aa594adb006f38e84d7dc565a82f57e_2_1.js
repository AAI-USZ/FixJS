function hint(code, config)
{
    var results = [];

    if (!_jshint.JSHINT(code, config)) {
        _jshint.JSHINT.errors.forEach(function (error) {
            if (error) {
                results.push(error);
            }
        });
    }

    _util.puts(JSON.stringify(results));
    process.exit(0);
}
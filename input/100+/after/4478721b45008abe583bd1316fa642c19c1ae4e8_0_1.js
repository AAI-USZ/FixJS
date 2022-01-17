function test(callback) {
    var env = process.env,
        lib = process.cwd() + '/lib',
        script = process.cwd() + '/build/scripts/runTestsInNode',
        child;

    env.NODE_PATH = lib;
    child = childProcess.spawn(process.execPath, [script], {'env': env});

    function log(data) {
        process.stdout.write(new Buffer(data).toString('utf-8'));
    }

    child.stdout.on('data', log);
    child.stderr.on('data', log);
    child.on('exit', function (code) {
        callback(code);
    });
}
function () {
        var targets = __dirname + "/../" + (custom ? custom : "test");

        jasmine.run(targets.split(' '), function (runner) {
            var failed = runner.results().failedCount === 0 ? 0 : 1;
            //Nuke everything out of node_modules since it was just in there to run the tests
            childProcess.exec('rm -rf node_modules/ripple*', function () {
                (typeof done !== "function" ? process.exit : done)(failed);
            });
        });
    }
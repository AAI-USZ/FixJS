function () {
        var targets = __dirname + "/../test";

        jasmine.run(targets.split(' '), function (runner) {
            var failed = runner.results().failedCount === 0 ? 0 : 1;
            (typeof done !== "function" ? process.exit : done)(failed);
        });
    }
function (runner) {
            var failed = runner.results().failedCount === 0 ? 0 : 1;
            (typeof done !== "function" ? process.exit : done)(failed);
        }
function (done) {
    //HACK: this should be  taken out if our pull request in jasmine is accepted.
    jasmine.core.Matchers.prototype.toThrow = function (expected) {
        var result = false,
            exception,
            not = this.isNot ? "not " : "";

        if (typeof this.actual !== 'function') {
            throw new Error('Actual is not a function');
        }
        try {
            this.actual();
        } catch (e) {
            exception = e;
        }
        if (exception) {
            if (typeof expected === 'function') {
                result = expected(exception);
            }
            else {
                result = (expected === jasmine.core.undefined || this.env.equals_(exception.message || exception, expected.message || expected));
            }
        }

        this.message = function () {
            if (exception && (expected === jasmine.core.undefined || !this.env.equals_(exception.message || exception, expected.message || expected))) {
                return ["Expected function " + not + "to throw", expected ? expected.message || expected : "an exception", ", but it threw", exception.message || exception].join(' ');
            } else {
                return "Expected function to throw an exception.";
            }
        };

        return result;
    };

    _setupEnv(function () {
        var targets = __dirname + "/../test";

        jasmine.run(targets.split(' '), function (runner) {
            var failed = runner.results().failedCount === 0 ? 0 : 1;
            (typeof done !== "function" ? process.exit : done)(failed);
        });
    });
}
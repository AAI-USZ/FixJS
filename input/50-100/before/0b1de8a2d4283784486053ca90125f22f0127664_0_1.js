function () {
            test("allows no dependencies to be specified", function (done) {
                require(function () {
                    done();
                });
            });

            test("allows itself to be named (only useful for requires outside define(...)s or data-main)", function (done) {
                require("i-am-the-one-and-only", function () {
                    done();
                });
            });
        }
function () {
        var router = this.router = new Y.Router(),
            origin = 'http://something.really.random.com',
            test   = this;

        // We don't want the uncaught error line noise because we expect an
        // error to be thrown, and it won't be caught because `save()` is async.
        Y.config.throwFail = false;
        Y.config.errorFn   = function (e) {
            test.resume(function () {
                Assert.areSame(e, 'Security error: The new URL must be of the same origin as the current URL.');
            });

            return true;
        };

        router.route('/foo', function () {
            test.resume(function () {
                Assert.fail('Should not route when URL has different origin.');
            });
        });

        // Wrapped in a setTimeout to make the async test work on iOS<5, which
        // performs this action synchronously.
        setTimeout(function () {
            router.replace(origin + '/foo');
        }, 1);

        this.wait(500);
    }
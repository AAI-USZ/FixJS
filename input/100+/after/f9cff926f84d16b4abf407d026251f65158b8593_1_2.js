function () {
        var test     = this,
            router   = this.router = new Y.Router({html5: false}),
            pathRoot = router._getPathRoot();

        router.set('root', pathRoot);
        router.route('/save', function (req) {
            test.resume(function () {
                Assert.areSame('/save', req.path);
                Assert.areSame('/save', Y.HistoryHash.getHash());
            });
        });

        // Wrapped in a setTimeout to make the async test work on iOS<5, which
        // performs this action synchronously.
        setTimeout(function () {
            router.save('/save');
        }, 1);

        this.wait(1000);
    }
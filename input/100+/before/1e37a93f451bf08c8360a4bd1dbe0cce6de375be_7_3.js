function () {
        var test   = this,
            router = this.router = new Y.Router({html5: false});

        Y.HistoryHash.setHash('/save');

        router.route('/save', function (req) {
            test.resume(function () {
                Assert.areSame('/save', req.path);
            });
        });

        // Wrapped in a setTimeout to make the async test work on iOS<5, which
        // performs this action synchronously.
        setTimeout(function () {
            router.save('/save');
        }, 1);

        this.wait(1000);
    }
function () {
        var test = this,
            router;

        Y.HistoryHash.setHash('/save');

        router = this.router = new Y.Router({html5: false});

        // Wrapped in a setTimeout to make the async test work on iOS<5, which
        // performs this action synchronously.
        setTimeout(function () {
            router.route('/save', function (req) {
                test.resume(function () {
                    Assert.areSame('/save', req.path);
                });
            });

            router.save('/save');
        }, 10);

        this.wait(1000);
    }
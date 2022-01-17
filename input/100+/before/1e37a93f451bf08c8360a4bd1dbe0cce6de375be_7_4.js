function () {
        var calls     = 0,
            routerOne = this.router  = new Y.Router(),
            routerTwo = this.router2 = new Y.Router();

        routerOne.route('/baz', function () {
            calls += 1;
        });

        routerTwo.route('/baz', function () {
            calls += 1;
        });

        // Make sure calling `destroy()` doesn't detach `routerTwo`'s history
        // event listener.
        routerOne.destroy();
        routerTwo.save('/baz');

        this.wait(function () {
            Assert.areSame(1, calls);
        }, 200);
    }
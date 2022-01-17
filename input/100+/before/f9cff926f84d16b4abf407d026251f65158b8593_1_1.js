function () {
        var router = this.router = new Y.Router();

        router.one = function () {};
        function two() {}

        Assert.areSame(0, router._routes.length);

        Assert.areSame(router, router.route('/foo', 'one'));
        Assert.areSame(1, router._routes.length);

        router.route(/bar/, two);
        Assert.areSame(2, router._routes.length);

        Assert.areSame('one', router._routes[0].callback);
        Assert.areSame(two, router._routes[1].callback);
    }
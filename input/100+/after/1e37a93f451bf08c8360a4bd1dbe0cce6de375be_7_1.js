function () {
        var router = this.router = new Y.Router(),
            router2 = new Y.Router();

        function noop () {}

        router.route('/:foo', noop);
        router.route(/foo/, noop);
        router.route('/bar', noop);

        Assert.isTrue(router.hasRoute('/foo'));
        Assert.isTrue(router.hasRoute('/bar'));
        Assert.isTrue(router.hasRoute('/bar?a=b'));
        Assert.isTrue(router.hasRoute('/baz?a=b')); // This matches /:foo
        Assert.isFalse(router.hasRoute('/baz/quux'));
        Assert.isFalse(router.hasRoute('/baz/quux?a=b'));

        // Need to test a router that doesn't have a /:foo catch-all
        router2.route('/foo', noop);
        router2.route('/bar', noop);

        Assert.isTrue( router2.hasRoute('/foo'));
        Assert.isTrue( router2.hasRoute('/bar'));
        Assert.isTrue( router2.hasRoute('/bar?a=b'));
        Assert.isFalse(router2.hasRoute('/baz?a=b'));

        // Cleanup router2.
        router2.destroy();
    }
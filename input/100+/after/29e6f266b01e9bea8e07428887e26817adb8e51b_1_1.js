function () {
        var router = this.router = new Y.Router();

        function noop () {}

        router.route('/:foo', noop);
        router.route(/foo/, noop);
        router.route('/bar', noop);

        Assert.isTrue(router.hasRoute('/foo'));
        Assert.isTrue(router.hasRoute('/bar'));
        Assert.isTrue(router.hasRoute('/bar?a=b'));
        Assert.isTrue(router.hasRoute('/baz?a=b'));
        Assert.isFalse(router.hasRoute('/baz/quux'));
        Assert.isFalse(router.hasRoute('/baz/quux?a=b'));
    }
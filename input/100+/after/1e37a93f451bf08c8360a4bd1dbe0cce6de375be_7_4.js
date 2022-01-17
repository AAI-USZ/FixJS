function () {
        var test      = this,
            calls     = 0,
            routerOne = test.router = new Y.Router(),
            routerTwo;

        function handleFoo() {
            calls += 1;
        }

        routerOne.route('/foo/*', handleFoo);
        routerOne.save('/foo/');

        setTimeout(function () {
            routerTwo = test.router2 = new Y.Router();

            routerTwo.route('/foo/*', handleFoo);
            routerTwo.save('/foo/bar/');
        }, 100);

        test.wait(function () {
            Assert.areSame(3, calls);
        }, 250);
    }
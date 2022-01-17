function () {
        Y.HistoryHash.setHash('');

        var router = this.router = new Y.Router();

        Assert.areSame(Y.getLocation().pathname, router.getPath());
    }
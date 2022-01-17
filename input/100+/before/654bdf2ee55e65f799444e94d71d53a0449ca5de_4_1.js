function () {
        log('showing home stream', this, this);

        var homeLayoutView = null;

        if (app.authenticatedUser) {
            var homeLayoutView = new HomePrivateLayoutView({ model: app.authenticatedUser.user });
        } else {
            var homeLayoutView = new HomePublicLayoutView();
        }

        app.content[app.getShowViewMethodName('home')](homeLayoutView);

        if (app.isPrerendering('home')) {
            homeLayoutView.showBootstrappedDetails();
        }

        if (app.authenticatedUser) {
            homeLayoutView.showStream();
        }

        app.setPrerenderComplete();
    }
function () {
            var activityCollection = new ActivityCollection();
            var options = {
                model: app.authenticatedUser.user,
                collection: activityCollection,
                isHomeStream: true
            };

            if (app.isPrerendering('home')) {
                options['el'] = '.stream';
            }

            var streamView = new StreamView(options);

            if (app.isPrerendering('home')) {
                this.details.attachView(streamView);
                streamView.showBootstrappedDetails();
            } else {
                this.details.show(streamView);
            }

            activityCollection.fetchFirstPage();
        }
function () {
            var streamItemCollection = new StreamItemCollection(null, { groupOrUser: this.model });
            var options = {
                model: this.model,
                collection: streamItemCollection
            };
            if (app.isPrerendering('teams')) {
                options['el'] = '.stream';
            }
            var streamView = new StreamView(options);
            if (app.isPrerendering('teams')) {
                this.details.attachView(streamView);
                streamView.showBootstrappedDetails();
            } else {
                this.details.show(streamView);
            }
            streamItemCollection.fetchFirstPage();
        }
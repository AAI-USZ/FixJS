function () {
            var streamItemCollection = new StreamItemCollection(null, { groupOrUser: this.model });
            var options = {
                model: this.model,
                collection: streamItemCollection
            };
            if (app.isPrerendering('organisations')) {
                options['el'] = '.stream';
            }
            var streamView = new StreamView(options);
            if (app.isPrerendering('organisations')) {
                this.details.attachView(streamView);
                streamView.showBootstrappedDetails();
            } else {
                this.details.show(streamView);
            }
            streamItemCollection.fetchFirstPage();
        }
function (observation) {
            var options = { model: observation };

            if (app.isPrerendering('observations')) {
                options['el'] = '.observation-details';
            }

            var observationDetailsView = new ObservationDetailsView(options);
            this.main[app.getShowViewMethodName('observations')](observationDetailsView);

            if (app.isPrerendering('observations')) {
                observationDetailsView.showBootstrappedDetails();
            }
        }
function (model) {
                log('obs', model);
                var observation = new Observation(model.Observation);
                var observationLayoutView = showObservationLayoutView(observation);
                observationLayoutView.showObservationDetails(observation);
                app.setPrerenderComplete();
            }
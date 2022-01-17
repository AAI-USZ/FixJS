function(response) {
                        if (!response)
                            return next();
                        if (response.markers && response.markers.length > 0) {
                            aggregateActions.markers = aggregateActions.markers.concat(response.markers);
                        }
                        if (response.enableRefactorings && response.enableRefactorings.length > 0) {
                            aggregateActions.enableRefactorings = aggregateActions.enableRefactorings.concat(response.enableRefactorings);
                        }
                        if (response.hint) {
                            // Last one wins, support multiple?
                            aggregateActions.hint = response.hint;
                        }
                        next();
                    }
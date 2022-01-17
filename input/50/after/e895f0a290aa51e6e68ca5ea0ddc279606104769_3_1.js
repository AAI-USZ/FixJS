function (args) {
                // TODO this is a global ... remove it!
                grid = new og.analytics.Grid({
                    selector: content,
                    source: {
                        type: 'portfolio',
                        depgraph: false,
                        viewdefinition: args.id,
                        live: true,
                        provider: 'Live market data (Bloomberg, Activ, TullettPrebon)'
                    }
                });
            }
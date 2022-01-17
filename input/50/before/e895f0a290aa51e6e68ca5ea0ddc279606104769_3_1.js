function (args) {
                // TODO this is a global ... remove it!
                grid = new og.analytics.Grid({
                    selector: content,
                    source: {
                        type: 'portfolio',
                        depgraph: false,
                        viewdefinition: 'DbCfg~2196860',
                        live: true,
                        provider: 'Live market data (Bloomberg, Activ, TullettPrebon)'
                    }
                });
            }
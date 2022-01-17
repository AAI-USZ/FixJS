function() {

            addon.addJs('jsf1', 'top');
            addon.addJs('jsf2', 'top');
            addon.addCss('cssf1');

            addon.addJs('jsf1');
            addon.addCss('cssf1', 'bottom');

            var to = {
                top: {
                    js: ['jst1','jst2'],
                    css: ['csst1','csst2','csst3']
                },
                bottom: {
                    js: ['jst1']
                }
            };

            var expected = {
                top: {
                    js: ['jst1','jst2','jsf1','jsf2'],
                    css: ['csst1','csst2','csst3','cssf1']
                },
                bottom: {
                    js: ['jst1']
                }
            };

            addon.mergeMetaInto({assets: to});

            OA.areEqual(expected.top.js, to.top.js, 'bad top.js');
            OA.areEqual(expected.top.css, to.top.css, 'bad top.css');
            OA.areEqual(expected.bottom.js, to.bottom.js, 'bad bottom.js');
            A.isUndefined(to.bottom.css, 'bad bottom.css');
        }
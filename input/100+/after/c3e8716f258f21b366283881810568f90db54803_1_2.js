function() {

            addon.addJs('jsf1', 'top');
            addon.addJs('jsf2', 'top');

            addon.addCss('cssf1');      // css defaults to top
            addon.addJs('jsf3');        // js defaults to bottom

            var to = {
                top: {
                    js: ['jst1','jst2'],
                    css: ['csst1','csst2','csst3']
                },
                bottom: {
                    js: ['jsb1']
                }
            };

            var expected = {
                top: {
                    js: ['jst1','jst2','jsf1','jsf2'],
                    css: ['csst1','csst2','csst3','cssf1']
                },
                bottom: {
                    js: ['jsb1', 'jsf3']
                }
            };

            addon.mergeMetaInto({assets: to});

            AA.itemsAreEqual(expected.top.js, to.top.js);
            AA.itemsAreEqual(expected.top.css, to.top.css);
            AA.itemsAreEqual(expected.bottom.js, to.bottom.js);
            A.isUndefined(to.bottom.css, 'bad bottom.css');
        }
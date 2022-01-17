function() {
            var js1 = 'js1', js2 = 'js2',
                css1 = 'css1', css2 = 'css2';

            addon.addJs(js1);
            addon.addCss(css1);
            addon.addJs(js2);
            addon.addCss(css2);

            var t = addon.getAssets('top');
            var b = addon.getAssets('bottom');

            A.isUndefined(b.bottom.css, 'should not have bottom css');
            AA.itemsAreEqual([js1, js2], b.bottom.js, 'bad js values');
            A.isUndefined(t.top.js, 'should not have top js');
            AA.itemsAreEqual([css1, css2], t.top.css, 'bad css values');
        }
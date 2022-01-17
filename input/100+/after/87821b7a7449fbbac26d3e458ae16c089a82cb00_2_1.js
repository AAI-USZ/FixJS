function () {
            var pd = persistentData();
            pd.specs = [];
            var specs = this.specs();
            for (var i=0; i<specs.length; i++) {
                var spec = specs[i];
                if (!spec.env.specFilter(spec)) {
                    continue;
                }
                var _pageUrl = pageUrl(spec.suite);
                if (_pageUrl) {
                    pd.specs.push({
                        loadScripts:utilityScripts.concat([scriptUrl(spec.suite)]),
                        specPath:jasmineUtils.specPath(spec),
                        url:_pageUrl
                    });
                }
            }
            if (pd.specs.length===0) {
                return _execute.apply(this, arguments);
            } else {
                pd.specIndex = 0;
                pd.reporterUrl = globals.window.location.href;
                urlLoader.navigateWithReloadTo(globals.window, pd.specs[0].url, pd.loadCounter++);
            }
        }
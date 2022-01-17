function(meta, tunnel){
            var ac = this._ac,
                assets = ac.assets.getAssets(),
                appMeta = this._meta.app,
                mojitoCore = this._meta.core,
                bundleMojits = (appMeta[ac.action] || appMeta['*']).mojits || [],
                rolledCSS, rolledJS;

            assets.top = assets.top || {};
            assets.bottom = assets.bottom || {};
            assets.top.js = assets.top.js || [];
            assets.top.css = assets.top.css || [];
            assets.bottom.js = assets.bottom.js || [];
            assets.bottom.css = assets.bottom.css || [];

            //TODO: This feature will stay at least 'til they upgrade to YUI 3.5.1
            if(this._deployClient && this._shakerYUI){
                this._upgradeYUI(ac, meta);
            }

            //get all resources
            var coreRollup,
                topjs = assets.top.js || [],
                bottomjs = assets.bottom.js || [],
                js = topjs.concat(bottomjs),
                topcss = assets.top.css || [],
                bottomcss = assets.bottom.css | [],
                css = topcss.concat(bottomcss),

                groupsJS = filterAssets(this._appConfig,js),
                loadedMojits = {},
                rollupsMojits = [],
                rollupsApp = [],
                noBundledMojits,
                allRollups;

            //get all mojits and map the action
            loadedMojits = this._matchLoadedMojits(ac,meta);

            //we just need to rollup the low-coverage Mojits
            noBundledMojits = this._diffMojits(loadedMojits,bundleMojits);

            //rollup non-Bundled Mojits
            rollupsMojits = this._shakeMojits(noBundledMojits,groupsJS.mojits);

            //if we are in the tunnel communication, we just set the meta and finish execution fast
            if (tunnel) {
                meta.assets = {top:{css:rollupsMojits}};
                return;
            }

            rollupsApp = this._shakeApp(groupsJS.app);
            allRollups = rollupsApp.concat(rollupsMojits);

            if (this._ssl) {
                this.sslHostRewrite(allRollups);
            }

            rolledCSS = allRollups.filter(function(i){return libpath.extname(i) === '.css';});
            rolledJS = allRollups.filter(function(i){return libpath.extname(i) === '.js';});
            //if deploy to true add the mojitoCore
            if(this._deployClient){
                rolledJS = mojitoCore.concat(rolledJS);
                assets.bottom.js = rolledJS;
            }
            
            assets.top.css = (assets.top.css && assets.top.css.concat(rolledCSS)) || rolledCSS;
        }
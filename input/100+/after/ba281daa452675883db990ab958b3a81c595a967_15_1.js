function(Y, o) {
            var loader = Y.Env._loader,
                lCore = [ 'loader-base' ],
                G_ENV = YUI.Env,
                mods = G_ENV.mods;

            if (loader) {
                //loader._config(Y.config);
                loader.ignoreRegistered = false;
                loader.onEnd = null;
                loader.data = null;
                loader.required = [];
                loader.loadType = null;
            } else {
                loader = new Y.Loader(Y.config);
                Y.Env._loader = loader;
            }
            if (mods && mods.loader) {
                lCore = [].concat(lCore, YUI.Env.loaderExtras);
            }
            YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));

            return loader;
        }
function(Y, o) {
            var loader = Y.Env._loader;
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
            YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, [ 'loader-base', 'loader-rollup', 'loader-yui3' ]));

            return loader;
        }
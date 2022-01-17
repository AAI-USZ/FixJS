function() {
        var filter, el,
            Y = this,
            G_ENV = YUI.Env,
            Env = Y.Env,
            prop;

        /**
         * The version number of the YUI instance.
         * @property version
         * @type string
         */
        Y.version = VERSION;

        if (!Env) {
            Y.Env = {
                core: ['get','features','intl-base','yui-log','yui-later'],
                loaderExtras: ['loader-rollup', 'loader-yui3'],
                mods: {}, // flat module map
                versions: {}, // version module map
                base: BASE,
                cdn: BASE + VERSION + '/build/',
                // bootstrapped: false,
                _idx: 0,
                _used: {},
                _attached: {},
                _missed: [],
                _yidx: 0,
                _uidx: 0,
                _guidp: 'y',
                _loaded: {},
                // serviced: {},
                // Regex in English:
                // I'll start at the \b(simpleyui).
                // 1. Look in the test string for "simpleyui" or "yui" or
                //    "yui-base" or "yui-davglass" or "yui-foobar" that comes after a word break.  That is, it
                //    can't match "foyui" or "i_heart_simpleyui". This can be anywhere in the string.
                // 2. After #1 must come a forward slash followed by the string matched in #1, so
                //    "yui-base/yui-base" or "simpleyui/simpleyui" or "yui-pants/yui-pants".
                // 3. The second occurence of the #1 token can optionally be followed by "-debug" or "-min",
                //    so "yui/yui-min", "yui/yui-debug", "yui-base/yui-base-debug". NOT "yui/yui-tshirt".
                // 4. This is followed by ".js", so "yui/yui.js", "simpleyui/simpleyui-min.js"
                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a "?" in the string,
                //    then capture the junk between the LAST "&" and the string in 1-4.  So
                //    "blah?foo/yui/yui.js" will capture "foo/" and "blah?some/thing.js&3.3.0/build/yui-davglass/yui-davglass.js"
                //    will capture "3.3.0/build/"
                //
                // Regex Exploded:
                // (?:\?             Find a ?
                //   (?:[^&]*&)      followed by 0..n characters followed by an &
                //   *               in fact, find as many sets of characters followed by a & as you can
                //   ([^&]*)         capture the stuff after the last & in \1
                // )?                but it's ok if all this ?junk&more_junk stuff isn't even there
                // \b(simpleyui|     after a word break find either the string "simpleyui" or
                //    yui(?:-\w+)?   the string "yui" optionally followed by a -, then more characters
                // )                 and store the simpleyui or yui-* string in \2
                // \/\2              then comes a / followed by the simpleyui or yui-* string in \2
                // (?:-(min|debug))? optionally followed by "-min" or "-debug"
                // .js               and ending in ".js"
                _BASE_RE: /(?:\?(?:[^&]*&)*([^&]*))?\b(simpleyui|yui(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,
                parseBasePath: function(src, pattern) {
                    var match = src.match(pattern),
                        path, filter;

                    if (match) {
                        path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));

                        // this is to set up the path to the loader.  The file
                        // filter for loader should match the yui include.
                        filter = match[3];

                        // extract correct path for mixed combo urls
                        // http://yuilibrary.com/projects/yui3/ticket/2528423
                        if (match[1]) {
                            path += '?' + match[1];
                        }
                        path = {
                            filter: filter,
                            path: path
                        }
                    }
                    return path;
                },
                getBase: G_ENV && G_ENV.getBase ||
                        function(pattern) {
                            var nodes = (doc && doc.getElementsByTagName('script')) || [],
                                path = Env.cdn, parsed,
                                i, len, src;

                            for (i = 0, len = nodes.length; i < len; ++i) {
                                src = nodes[i].src;
                                if (src) {
                                    parsed = Y.Env.parseBasePath(src, pattern);
                                    if (parsed) {
                                        filter = parsed.filter;
                                        path = parsed.path;
                                        break;
                                    }
                                }
                            }

                            // use CDN default
                            return path;
                        }

            };

            Env = Y.Env;

            Env._loaded[VERSION] = {};

            if (G_ENV && Y !== YUI) {
                Env._yidx = ++G_ENV._yidx;
                Env._guidp = ('yui_' + VERSION + '_' +
                             Env._yidx + '_' + time).replace(/\./g, '_').replace(/-/g, '_');
            } else if (YUI._YUI) {

                G_ENV = YUI._YUI.Env;
                Env._yidx += G_ENV._yidx;
                Env._uidx += G_ENV._uidx;

                for (prop in G_ENV) {
                    if (!(prop in Env)) {
                        Env[prop] = G_ENV[prop];
                    }
                }

                delete YUI._YUI;
            }

            Y.id = Y.stamp(Y);
            instances[Y.id] = Y;

        }

        Y.constructor = YUI;

        // configuration defaults
        Y.config = Y.config || {
            bootstrap: true,
            cacheUse: true,
            debug: true,
            doc: doc,
            fetchCSS: true,
            throwFail: true,
            useBrowserConsole: true,
            useNativeES5: true,
            win: win
        };

        //Register the CSS stamp element
        if (doc && !doc.getElementById(CSS_STAMP_EL)) {
            el = doc.createElement('div');
            el.innerHTML = '<div id="' + CSS_STAMP_EL + '" style="position: absolute !important; visibility: hidden !important"></div>';
            YUI.Env.cssStampEl = el.firstChild;
            if (doc.body) {
                doc.body.appendChild(YUI.Env.cssStampEl);
            } else {
                docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);
            }
        }

        Y.config.lang = Y.config.lang || 'en-US';

        Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);

        if (!filter || (!('mindebug').indexOf(filter))) {
            filter = 'min';
        }
        filter = (filter) ? '-' + filter : filter;
        Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';

    }
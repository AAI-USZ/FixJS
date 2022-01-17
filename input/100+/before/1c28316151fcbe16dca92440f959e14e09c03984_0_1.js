function (wmode) {
        var i,
            prefs = YSLOW.util.Preference.getPrefList("extensions.firebug.yslow.");

        this.windowMode = wmode;

        // Preference branch has been changed starting YSlow2, copy over the preference from YSlow1
        if (prefs && prefs.length > 0) {
            for (i = 0; i < prefs.length; i += 1) {
                if (YSLOW.util.Preference.getPref(prefs[i].name) !== undefined) {
                    YSLOW.util.Preference.setPref(prefs[i].name, prefs[i].value);
                }
                // delete old pref
                YSLOW.util.Preference.deletePref("extensions.firebug.yslow." + prefs[i].name);
            }
        }

        if (typeof Firebug !== 'undefined') {
            // PATCH by Adrian Yee (adrian@gossamer-threads.com) GTMetrix
            // via exceptional-performance@yahoogroups.com
            //
            // There seems to be some sort of timing issue with YSlow and
            // Firebug which causes an error in YSLOW.FBYSlow.init(),
            // "YSLOW.firefox.startup():TypeError: FBL.extend is not a
            // function".  Hack around this by retrying the call to
            // YSLOW.FBYSlow.init() if it fails.
            if (typeof FBL.extend !== 'function') {
                YSLOW.util.setTimer(function() {
                    YSLOW.firefox.startup(wmode);
                }, 10);
                return;
            }

            try {
                if (Firebug === null) {
                    FBL.ns(function () {
                        YSLOW.FBYSlow.init();
                    });
                } else {
                    YSLOW.FBYSlow.init();
                }
            } catch (err) {
                YSLOW.util.dump("YSLOW.firefox.startup():" + err);
            }
            return;
        }

        YSLOW.firefox.init();
    }
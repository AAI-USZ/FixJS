function () {
        var doc = Y.config.doc,
            ua  = Y.UA;

        // Note: some of these checks require browser sniffs since it's not
        // feasible to load test files on every pageview just to perform a
        // feature test. I'm sorry if this makes you sad.
        return (this._env = {
            // True if this is a browser that supports disabling async mode on
            // dynamically created script nodes. See
            // https://developer.mozilla.org/En/HTML/Element/Script#Attributes
            async: doc && doc.createElement('script').async === true,

            // True if this browser fires an event when a dynamically injected
            // link node fails to load. This is currently true for Firefox 9+
            // and WebKit 535.24+.
            cssFail: ua.gecko >= 9 || ua.webkit >= 535.24,

            // True if this browser fires an event when a dynamically injected
            // link node finishes loading. This is currently true for IE, Opera,
            // Firefox 9+, and WebKit 535.24+. Note that IE versions <9 fire the
            // DOM 0 "onload" event, but not "load". All versions of IE fire
            // "onload".
            // davglass: Seems that Chrome on Android needs this to be false.
            cssLoad: ((!ua.gecko && !ua.webkit) || 
                ua.gecko >= 9 || ua.webkit >= 535.24) && !(ua.chrome && ua.chrome <=18),

            // True if this browser preserves script execution order while
            // loading scripts in parallel as long as the script node's `async`
            // attribute is set to false to explicitly disable async execution.
            preservesScriptOrder: !!(ua.gecko || ua.opera)
        });
    }
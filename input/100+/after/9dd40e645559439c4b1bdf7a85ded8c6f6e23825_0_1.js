function bootstrap (fn) {
            if (typeof fn !== 'function')
                throw "parameter must be a function";

            var _this = this;
            function start () {
                // hide address bar
                window.scroll(0,0);

                // prevent page scrolling
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                fn.call(window, _this);
            }

            // workaround to avoid bug when JSON.parse is called with an empty argument
            // decribed here : http://code.google.com/p/android/issues/detail?id=11973
            JSON.originalParse = JSON.parse;

            JSON.parse = function(text){
                if (text) {
                    return JSON.originalParse(text);
                } else {
                    // no longer crashing on null value but just returning null
                    return null;
                }
            };

            if ('PhoneGap' in window && PhoneGap.available)
                document.addEventListener('deviceready', start);
            else
                window.addEventListener('load', start);
        }
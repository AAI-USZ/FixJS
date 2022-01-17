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

            if ('PhoneGap' in window && PhoneGap.available)
                document.addEventListener('deviceready', start);
            else
                window.addEventListener('load', start);
        }
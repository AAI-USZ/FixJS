function fx() {
            var fx;
            if (!!window.Zepto) {
                fx = window.Zepto;
                fx.fn.prop = fx.fn.attr;
            } else if (!!window.jQuery) {
                fx = window.jQuery;
                // trick to get Zepto/touch.js to work for jQuery
                //window.Zepto = $;
            } else {
                throw('Either Zepto or jQuery is required but neither can be found.');
            }
            return fx;
        }
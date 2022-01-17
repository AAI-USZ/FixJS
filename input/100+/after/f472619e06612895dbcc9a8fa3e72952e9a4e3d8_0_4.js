function(selector, context, rootQuery) {
                $root = $root || (Mobify.conf.data && Mobify.conf.data.$html);

                return ($.fn.init || $.zepto.init).call(this, selector, context || anchored.context(), rootQuery);
            }
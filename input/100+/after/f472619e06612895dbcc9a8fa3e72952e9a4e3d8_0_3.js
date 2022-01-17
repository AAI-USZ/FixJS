function($root) {
        var rootedQuery = function(selector, context, rootQuery) {
                $root = $root || (Mobify.conf.data && Mobify.conf.data.$html);

                return ($.fn.init || $.zepto.init).call(this, selector, context || anchored.context(), rootQuery);
            }

          , anchored = $.sub(rootedQuery); 

        anchored.context = function() {
            return $root || (Mobify.conf.data ? Mobify.conf.data.$html : '<div>');
        }

        if (!anchored.zepto)  {
            anchored.fn.init = rootedQuery;
            anchored.fn.init.prototype = $.fn;
        }

        return anchored;
    }
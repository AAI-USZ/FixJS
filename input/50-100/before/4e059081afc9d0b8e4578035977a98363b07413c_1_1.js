function(callback) {
            var _ready = globals.jQuery.ready;
            globals.jQuery.ready = function() {
                // Note: This is the border that makes isWaiting() false!
                if (globals.jQuery.readyWait===1 && globals.jQuery.isReady || globals.jQuery.readyWait===2 && !globals.jQuery.isReady) {
                    callback();
                }
                return _ready.apply(this, arguments);
            }
        }
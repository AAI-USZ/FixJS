function(hold) {
                if (hold) {
                    return _holdReady.apply(this, arguments);
                }
                // Note: This is the border that makes isWaiting() false!
                if (globals.jQuery.readyWait===1 && globals.jQuery.isReady || globals.jQuery.readyWait===2 && !globals.jQuery.isReady) {
                    callback();
                }
                return _holdReady.apply(this, arguments);
            }
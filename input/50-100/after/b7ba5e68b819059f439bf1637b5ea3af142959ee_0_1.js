function(event, args) {
            if (!!this.listeners[event]) {
                if (args == undefined) {
                    args = [];
                }
                
                for (var i = -1, length = this.listeners[event].length; ++i < length;) {
                    // execute in the global scope (window), though this could also be customized
                    this.listeners[event][i].apply(window, args);
                }
            }
        }
function(callback) {
            var afterCallbacks = this.afterCallbacks;

            // Add the callback to the stack
            afterCallbacks.push(callback);

            // Check whether all modules are ready for the 'after' hook
            if (this.application.modules.length == afterCallbacks.length) {
                for (var i = 0; i < afterCallbacks.length; i++) {
                    var afterCallback = afterCallbacks[i];

                    if(typeof afterCallback === "function") {
                        // make sure the callback is only executed once (and is not called during addModules)
                        delete afterCallbacks[i];
                        afterCallback();
                    }
                }
            }
        }
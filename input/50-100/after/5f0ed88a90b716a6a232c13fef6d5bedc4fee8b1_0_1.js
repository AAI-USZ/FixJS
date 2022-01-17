function (msgFromAlert) {
            if (msgFromAlert === scriptUrl) {
                // Resource loaded, time to fire the callback (if any)
                if (onScriptLoaded && typeof(onScriptLoaded) === "function") {
                    onScriptLoaded(scriptUrl);
                }
                // And disconnect the signal handler
                try {
                    this.javaScriptAlertSent.disconnect(arguments.callee);
                } catch (e) {}
            }
        }
function (msgFromAlert) {
            if (msgFromAlert === scriptUrl) {
                // Resource loaded, time to fire the callback
                onScriptLoaded(scriptUrl);
                // And disconnect the signal handler
                try {
                    this.javaScriptAlertSent.disconnect(arguments.callee);
                } catch (e) {}
            }
        }
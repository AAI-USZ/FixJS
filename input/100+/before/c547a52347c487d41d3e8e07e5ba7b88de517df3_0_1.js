function() {

    this.schedule = function(change) {
        //this.onRender(change);
        //return;
        this.changes = this.changes | change;
        if (!this.pending) {
            this.pending = true;
            var _self = this;
            this.setTimeoutZero(function() {
                _self.pending = false;
                var changes = _self.changes;
                _self.changes = 0;
                _self.onRender(changes);
            });
        }
    };

    if (window.postMessage) {
        this.setTimeoutZero = (function(messageName, attached, listener) {
            return function setTimeoutZero(callback) {
                // Set up listener if not listening already.
                if (!attached) {
                    event.addListener(this, "message", function(e) {
                        if (listener && e.data == messageName) {
                            event.stopPropagation(e);
                            listener();
                        }
                    });
                    attached = true;
                }

                listener = callback;
                this.postMessage(messageName, "*");
            };
        })("zero-timeout-message", false, null);
    }
    else {
        this.setTimeoutZero = function(callback) {
            this.setTimeout(callback, 0);
        };
    }

}
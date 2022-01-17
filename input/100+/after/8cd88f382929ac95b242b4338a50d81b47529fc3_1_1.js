function(ev, state) {
        if (state)
            this.setState(state);

        this.x = ev.x;
        this.y = ev.y;

        // do not move textarea during selection
        var renderer = this.editor.renderer;
        if (renderer.$keepTextAreaAtCursor)
            renderer.$keepTextAreaAtCursor = null;

        var self = this;
        var onMouseMove = function(e) {
            self.x = e.clientX;
            self.y = e.clientY;
        };

        var onCaptureEnd = function(e) {
            clearInterval(timerId);
            self[self.state + "End"] && self[self.state + "End"](e);
            self.$clickSelection = null;
            if (renderer.$keepTextAreaAtCursor == null) {
                renderer.$keepTextAreaAtCursor = true;
                renderer.$moveTextAreaToCursor();
            }
        };

        var onCaptureInterval = function() {
            self[self.state] && self[self.state]();
        }
        
        if (useragent.isOldIE && ev.domEvent.type == "dblclick") {
            setTimeout(function() {
                onCaptureInterval();
                onCaptureEnd(ev.domEvent);
            });
            return;
        }

        event.capture(this.editor.container, onMouseMove, onCaptureEnd);
        var timerId = setInterval(onCaptureInterval, 20);
    }
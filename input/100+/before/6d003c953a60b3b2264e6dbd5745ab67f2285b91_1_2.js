function(ev, state) {
        if (state)
            this.setState(state);

        this.x = ev.x;
        this.y = ev.y;

        // do not move textarea during selection
        var kt = this.editor.renderer.$keepTextAreaAtCursor;
        this.editor.renderer.$keepTextAreaAtCursor = false;

        var self = this;
        var onMouseSelection = function(e) {
            self.x = e.clientX;
            self.y = e.clientY;
        };

        var onMouseSelectionEnd = function(e) {
            clearInterval(timerId);
            self[self.state + "End"] && self[self.state + "End"](e);
            self.$clickSelection = null;
            self.editor.renderer.$keepTextAreaAtCursor = kt;
            self.editor.renderer.$moveTextAreaToCursor();
        };

        var onSelectionInterval = function() {
            self[self.state] && self[self.state]();
        }

        event.capture(this.editor.container, onMouseSelection, onMouseSelectionEnd);
        var timerId = setInterval(onSelectionInterval, 20);

        ev.preventDefault();
    }
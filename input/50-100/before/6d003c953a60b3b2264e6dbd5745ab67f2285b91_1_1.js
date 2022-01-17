function(e) {
            clearInterval(timerId);
            self[self.state + "End"] && self[self.state + "End"](e);
            self.$clickSelection = null;
            self.editor.renderer.$keepTextAreaAtCursor = kt;
            self.editor.renderer.$moveTextAreaToCursor();
        }
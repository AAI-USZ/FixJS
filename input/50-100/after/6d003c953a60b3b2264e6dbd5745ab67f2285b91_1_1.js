function(e) {
            clearInterval(timerId);
            self[self.state + "End"] && self[self.state + "End"](e);
            self.$clickSelection = null;
            if (renderer.$keepTextAreaAtCursor == null) {
                renderer.$keepTextAreaAtCursor = true;
                renderer.$moveTextAreaToCursor();
            }
        }
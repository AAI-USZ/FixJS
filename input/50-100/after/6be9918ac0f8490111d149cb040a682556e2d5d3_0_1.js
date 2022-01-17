function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else if (!e.altKey && !e.shiftKey && e.keyCode == 13) {
                    this.applyMode("view");
                }
            }
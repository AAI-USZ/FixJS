function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else {
                    if (e.ctrlKey && e.keyCode == 13) {
                        this.applyMode("view");
                    }
                }
            }
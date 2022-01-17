function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else {
                    this.update();
                    //I am waiting for ctrl + enter to accept changes
                    if (e.ctrlKey && e.keyCode == 13) {
                        this.applyMode("view");
                    }
                }
            }
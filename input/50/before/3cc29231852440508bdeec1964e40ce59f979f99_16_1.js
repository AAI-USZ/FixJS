function() {
            document.addEventListener("keydown", this, false);
            document.addEventListener("keyup", this, false);

            this.addPropertyChangeListener("appModel.livePreview", this.handleLivePreview, false);
        }
function() {
    if (this.mode & C.M_CONTROLS_ENABLED) {
        if (!this.controls) {
            this.controls = new Controls(this);
            this.controls.update(this.canvas);
        }
    } else {
        if (this.controls) {
            this.controls.detach(this.canvas);
            this.controls = null;
        }
    }
    if (this.mode & C.M_INFO_ENABLED) {
        if (!this.info) {
            this.info = new InfoBlock(this);
            this.info.update(this.canvas);
        }
    } else {
        if (this.info) {
            this.info.detach(this.canvas);
            this.info = null;
        }
    }
    // FIXME: M_HANDLE_EVENTS
}
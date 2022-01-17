function (touches, event) {
        if (!this.isMouseDown) {
            this._beginPos = touches[0].locationInView(0);
        }
        this.isMouseDown = true;
    }
function (touches, event) {
        if (!this.isMouseDown) {
            this._beginPos = touches[0].locationInView();
        }
        this.isMouseDown = true;
    }
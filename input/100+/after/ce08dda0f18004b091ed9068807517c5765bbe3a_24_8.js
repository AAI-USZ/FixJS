function () {
        // quick return if not visible
        if (!this._isVisible) {
            return;
        }
        if (!this._isNeedUpdate) {
            return;
        }

        this._isNeedUpdate = false;
        var context = this._layerContext;
        context.save();
        context.clearRect(0, 0, this._layerCanvas.width, -this._layerCanvas.height);

        if (this._children && this._children.length > 0) {
            this.sortAllChildren();
            // draw children zOrder < 0
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].visit(context);
            }
        }

        context.restore();
    }
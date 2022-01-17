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

        if (this._grid && this._grid.isActive()) {
            this._grid.beforeDraw();
            this.transformAncestors();
        }

        //this.transform(context);
        if (this._children) {
            // draw children zOrder < 0
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node && node._zOrder < 0) {
                    node.visit(context);
                }
            }
        }

        // draw children zOrder >= 0
        if (this._children) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node && node._zOrder >= 0) {
                    node.visit(context);
                }
            }
        }

        if (this._grid && this._grid.isActive()) {
            this._grid.afterDraw(this);
        }
        context.restore();
    }
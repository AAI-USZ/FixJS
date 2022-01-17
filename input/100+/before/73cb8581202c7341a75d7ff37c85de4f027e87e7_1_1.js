function (ctx) {
        // quick return if not visible
        if (!this._isVisible) {
            return;
        }
        var context = ctx || cc.renderContext;
        context.save();

        if (this._grid && this._grid.isActive()) {
            this._grid.beforeDraw();
        }

        this.transform(context);
        var i, node;
        if (this._children && this._children.length > 0) {
            this.sortAllChildren();
            // draw children zOrder < 0
            for (i = 0; i < this._children.length; i++) {
                node = this._children[i];
                if (node && node._zOrder < 0) {
                    node.visit(context);
                } else {
                    break;
                }
            }

            //if (this._isInDirtyRegion()) {
            // self draw
            this.draw(context);
            //}

            // draw children zOrder >= 0
            if (this._children) {
                for (; i < this._children.length; i++) {
                    node = this._children[i];
                    if (node && node._zOrder >= 0) {
                        node.visit(context);
                    }
                }
            }
        } else {
            //if (this._isInDirtyRegion()) {
            // self draw
            this.draw(context);
            //}
        }

        this._orderOfArrival = 0;

        if (this._grid && this._grid.isActive()) {
            this._grid.afterDraw(this);
        }

        context.restore();
    }
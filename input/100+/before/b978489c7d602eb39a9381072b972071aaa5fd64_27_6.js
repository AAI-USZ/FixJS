function (ctx) {
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            // quick return if not visible
            if (!this._isVisible) {
                return;
            }
            context.save();
            if (this._grid && this._grid.isActive()) {
                this._grid.beforeDraw();
                this.transformAncestors();
            }
            this.transform();

            if (this._isUseCache) {
                if (this._isCacheDirty) {
                    //add dirty region
                    this._renderTexture.clear();
                    this._renderTexture.context.translate(this._anchorPointInPixels.x, -this._anchorPointInPixels.y);

                    if (this._children) {
                        for (var i = 0; i < this._children.length; i++) {
                            if (this._children[i]) {
                                this._children[i].visit(this._renderTexture.context);
                            }
                        }
                    }
                    this._isCacheDirty = false;
                }
                // draw RenderTexture
                this.draw();
            } else {
                if (this._children) {
                    for (var i = 0; i < this._children.length; i++) {
                        if (this._children[i]) {
                            this._children[i].visit(context);
                        }
                    }
                }
            }


            if (this._grid && this._grid.isActive()) {
                this._grid.afterDraw(this);
            }
            context.restore();
        }
    }
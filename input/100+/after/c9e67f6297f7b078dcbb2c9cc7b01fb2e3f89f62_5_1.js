function (ctx) {
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            // quick return if not visible
            if (!this._isVisible) {
                return;
            }
            context.save();
            this.transform(ctx);
            var i;
            if (this._isUseCache) {
                if (this._isCacheDirty) {
                    //add dirty region
                    this._renderTexture.clear();
                    this._renderTexture.context.save();
                    this._renderTexture.context.translate(this._anchorPointInPoints.x , -(this._anchorPointInPoints.y ));
                    if (this._children) {
                        this.sortAllChildren();
                        for (i = 0; i < this._children.length; i++) {
                            if (this._children[i]) {
                                this._children[i].visit(this._renderTexture.context);
                            }
                        }
                    }
                    this._renderTexture.context.restore();
                    this._isCacheDirty = false;
                }
                // draw RenderTexture
                this.draw(ctx);
            } else {
                if (this._children) {
                    this.sortAllChildren();
                    for (i = 0; i < this._children.length; i++) {
                        if (this._children[i]) {
                            this._children[i].visit(context);
                        }
                    }
                }
            }
            context.restore();
        } else {
            //TODO
            //cc.PROFILER_START_CATEGORY(kCCProfilerCategoryBatchSprite, "CCSpriteBatchNode - visit");

            // CAREFUL:
            // This visit is almost identical to CocosNode#visit
            // with the exception that it doesn't call visit on it's children
            //
            // The alternative is to have a void CCSprite#visit, but
            // although this is less mantainable, is faster
            //
            if (!this._isVisible) {
                return;
            }

            //kmGLPushMatrix();

            if (this._grid && this._grid.isActive()) {
                this._grid.beforeDraw();
                this.transformAncestors();
            }

            this.sortAllChildren();
            this.transform();

            this.draw();

            if (this._grid && this._grid.isActive()) {
                this._grid.afterDraw(this);
            }

            //kmGLPopMatrix();
            this.setOrderOfArrival(0);

            //cc.PROFILER_STOP_CATEGORY(kCCProfilerCategoryBatchSprite, "CCSpriteBatchNode - visit");
        }
    }
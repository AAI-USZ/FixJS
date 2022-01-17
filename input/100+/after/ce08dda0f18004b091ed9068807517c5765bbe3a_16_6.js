function (ctx) {
        // quick return if not visible
        if (!this._isVisible) {
            return;
        }

        var context = ctx || cc.renderContext;
        var i;

        if(cc.renderContextType == cc.CANVAS){
            context.save();
            this.transform(context);

            if (this._children && this._children.length > 0) {
                this.sortAllChildren();
                // draw children zOrder < 0
                for (i = 0; i < this._children.length; i++) {
                    if (this._children[i] && this._children[i]._zOrder < 0) {
                        this._children[i].visit(context);
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
                        if (this._children[i] && this._children[i]._zOrder >= 0) {
                            this._children[i].visit(context);
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
            context.restore();
        } else{
            if (this._grid && this._grid.isActive()) {
                this._grid.beforeDraw();
            }

            this.transform(context);
            if (this._children && this._children.length > 0) {
                this.sortAllChildren();
                // draw children zOrder < 0
                for (i = 0; i < this._children.length; i++) {
                    if (this._children[i] && this._children[i]._zOrder < 0) {
                        this._children[i].visit(context);
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
                        if (this._children[i] && this._children[i]._zOrder >= 0) {
                            this._children[i].visit(context);
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
    }
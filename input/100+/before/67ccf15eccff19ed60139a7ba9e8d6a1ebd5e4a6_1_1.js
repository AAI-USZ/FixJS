function(){
        // quick return if not visible
        if (!this._m_bIsVisible) {
            return;
        }
        if(!this._isNeedUpdate){
            return;
        }

        this._isNeedUpdate = false;
        var context = this._layerContext;
        context.save();

        context.clearRect(0, 0, this._layerCanvas.width, -this._layerCanvas.height);

        if (this._m_pGrid && this._m_pGrid.isActive()) {
            this._m_pGrid.beforeDraw();
            this.transformAncestors();
        }

        //this.transform(context);
        if (this._m_pChildren) {
            // draw children zOrder < 0
            for (var i = 0; i < this._m_pChildren.length; i++) {
                var pNode = this._m_pChildren[i];
                if (pNode && pNode._m_nZOrder < 0) {
                    pNode.visit(context);
                }
            }
        }

        // draw children zOrder >= 0
        if (this._m_pChildren) {
            for (var i = 0; i < this._m_pChildren.length; i++) {
                var pNode = this._m_pChildren[i];
                if (pNode && pNode._m_nZOrder >= 0) {
                    pNode.visit(context);
                }
            }
        }

        if (this._m_pGrid && this._m_pGrid.isActive()) {
            this._m_pGrid.afterDraw(this);
        }
        context.restore();
    }
function (point) {

        if (!cc.Point.CCPointEqualToPoint(point, this._anchorPoint)) {
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

            this._anchorPoint = point;
            this._anchorPointInPoints = cc.ccp(this._contentSize.width * this._anchorPoint.x,
                this._contentSize.height * this._anchorPoint.y);

            //save dirty region when after changed
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this.setNodeDirty();
        }
        if (this.dom) {
            var size = this.getContentSize();
            var s = point;
            if (this._ignoreAnchorPointForPosition) {
                this.dom.style.left = "-" + (s.x * size.width) + "px";
                this.dom.style.top = (s.y * size.height) + "px";
                this.dom.style[cc.CSS3.origin] = (s.x * 100) + "% " + (s.y * -size.height) + "px";
            }
            else {
                this.dom.style[cc.CSS3.origin] = (s.x * 100) + "% " + (s.y * -size.height) + "px";
                this.dom.style.top = 0;
                this.dom.style.left = 0;
            }
            this.dom.style.width = size.width + "px";
            this.dom.style.maxHeight = size.height + "px";
        }

    }
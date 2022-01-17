function (label) {
        this._string = label;
        var len = label.length;
        this._textureAtlas.resizeCapacity(len);

        var s = new cc.Size();
        s.width = len * this._itemWidth;
        s.height = this._itemHeight;
        this.setContentSizeInPixels(s);

        if (this._children) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node) {
                    node.setIsVisible(false);
                }
            }
        }
        this.updateAtlasValues();
    }
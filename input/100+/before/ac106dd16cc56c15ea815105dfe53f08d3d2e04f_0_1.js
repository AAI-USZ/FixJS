function (label) {
        this._string = label;
        var len = label.length;
        this._textureAtlas.resizeCapacity(len);

        var s = new cc.SizeMake(len * this._itemWidth, this._itemHeight);
        this.setContentSizeInPixels(s);

        if (this._children) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node) {
                    node.setVisible(false);
                }
            }
        }
        this.updateAtlasValues();
    }
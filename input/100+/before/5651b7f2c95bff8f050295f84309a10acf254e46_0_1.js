function (label) {
        this._string = label;
        cc.renderContext.save();
        cc.renderContext.font = this._fontSize + "px '" + this._fontName + "'";
        var dim = cc.renderContext.measureText(this._string);
        this.setContentSize(new cc.Size(dim.width, this._fontSize));
        cc.renderContext.restore();
        this.setNodeDirty();
        return;

        var texture = new cc.Texture2D();
        if (cc.Size.CCSizeEqualToSize(this._dimensions, cc.SizeZero())) {
            texture.initWithString(label, this._fontName, this._fontSize);
        } else {
            texture = new cc.Texture2D();
            texture.initWithString(label, this._dimensions, this._alignment, this._fontName, this._fontSize);
        }
        this.setTexture(texture);

        var rect = cc.RectZero();
        rect.size = this._texture.getContentSize();
        this.setTextureRect(rect);
    }
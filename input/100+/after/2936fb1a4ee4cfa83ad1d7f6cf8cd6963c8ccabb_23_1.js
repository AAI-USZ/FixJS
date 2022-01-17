function (arg) {
        var string = arg[0], dimensions, hAlignment, vAlignment, fontName, fontSize;
        cc.Assert(string != null, "cc.LabelTTF.initWithString() label is null");
        if (arg.length == 6) {
            dimensions = arg[1];
            hAlignment = arg[2];
            vAlignment = arg[3];
            fontName = arg[4];
            fontSize = arg[5];
        }
        else if (arg.length == 5) {
            dimensions = arg[1];
            hAlignment = arg[2];
            vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
            fontName = arg[3];
            fontSize = arg[4];
        }
        else {
            dimensions = cc.SizeMake(0, arg[2]);
            hAlignment = cc.TEXT_ALIGNMENT_LEFT;
            vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM;
            fontName = arg[1];
            fontSize = arg[2];
        }
        if (this.init()) {
            this._dimensions = cc.SizeMake(dimensions.width, dimensions.height);
            this._fontName = fontName;
            this._hAlignment = hAlignment;
            this._vAlignment = vAlignment;
            this._fontSize = fontSize * cc.CONTENT_SCALE_FACTOR();
            this.setString(string);
            //this._parseLabelTTF();
            this._fontStyleStr = this._fontSize + "px '" + this._fontName + "'";
            return true;
        }
        return false;
    }
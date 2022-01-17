function () {
        var  context = cc.renderContext;
        var num = this._lineCount();
        var ttf = new cc.LabelNode();

        var xOffset = 0, yOffset = 0;
        switch (this._hAlignment) {
            case cc.TEXT_ALIGNMENT_LEFT:
                context.textAlign = "left";
                xOffset = 0;
                break;
            case cc.TEXT_ALIGNMENT_RIGHT:
                context.textAlign = "right";
                xOffset = this._dimensions.width;
                break;
            case cc.TEXT_ALIGNMENT_CENTER:
                context.textAlign = "center";
                xOffset = this._dimensions.width / 2;
                break;
            default:
                break;
        }

        switch (this._vAlignment) {
            case cc.VERTICAL_TEXT_ALIGNMENT_TOP:
                context.textBaseline = "top";
                yOffset = -this._dimensions.height;
                break;
            case cc.VERTICAL_TEXT_ALIGNMENT_CENTER:
                context.textBaseline = "middle";
                yOffset = -this._dimensions.height / 2;
                break;
            case cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM:
                context.textBaseline = "bottom";
                yOffset = 0;
                break;
            default:
                break;
        }


        ttf.pos = cc.Point(-this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y);
        ttf.text = this._string;
    }
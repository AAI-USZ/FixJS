function (ctx) {
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            if (this._flipX) {
                context.scale(-1, 1);
            }
            if (this._flipY) {
                context.scale(1, -1);
            }
            //this is fillText for canvas
            context.fillStyle = "rgba(" + this._color.r + "," + this._color.g + "," + this._color.b + ", " + this._opacity / 255 + ")";

            if (context.font != this._fontStyleStr)
                context.font = this._fontStyleStr;
            context.textBaseline = "bottom";

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

            if (((this._contentSize.width > this._dimensions.width) || this._string.indexOf("\n")) && this._dimensions.width !== 0) {
                this._wrapText(context, this._string,
                    -this._dimensions.width * this._anchorPoint.x,
                    this._dimensions.height * this._anchorPoint.y,
                    this._dimensions.width,
                    this._dimensions.height,
                    this._fontSize * 1.2);
            }
            else if (this._dimensions.width == 0) {
                context.fillText(this._string, -this._contentSize.width * this._anchorPoint.x, this._contentSize.height * this._anchorPoint.y);
            }
            else {
                context.fillText(this._string,
                    -this._dimensions.width * this._anchorPoint.x + xOffset,
                    this._dimensions.height * this._anchorPoint.y + yOffset);
            }
            cc.INCREMENT_GL_DRAWS(1);
        }
    }
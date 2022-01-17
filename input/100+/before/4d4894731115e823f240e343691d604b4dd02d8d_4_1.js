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
            var color = this._color;
            context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", " + this._opacity / 255 + ")";

            if (context.font != this._fontStyleStr)
                context.font = this._fontStyleStr;

            var offset = 0;
            switch (this._alignment) {
                case cc.TEXT_ALIGNMENT_LEFT:
                    offset = -(this._dimensions.width - this._contentSize.width) / 2;
                    break;
                case cc.TEXT_ALIGNMENT_RIGHT:
                    offset = (this._dimensions.width - this._contentSize.width) / 2;
                    break;
                default:
                    break;
            }

            if (this._contentSize.width > this._dimensions.width && this._dimensions.width !== 0) {
                this._wrapText(context, this._string,
                    -this._dimensions.width * this._anchorPoint.x,
                    -this._dimensions.height * this._anchorPoint.y,
                    this._dimensions.width,
                    this._fontSize * 1.2,
                    this._alignment);
            }
            else {
                context.fillText(this._string,
                    -this._contentSize.width * this._anchorPoint.x + offset,
                    this._contentSize.height * this._anchorPoint.y);
            }
        }
    }
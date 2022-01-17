function (ctx) {
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;

            context.globalAlpha = this._sprite._opacity / 255;
            var centerPoint, mpX=0, mpY=0;
            if (this._flipX) {
                centerPoint = new cc.Point(this._sprite._contentSize.width / 2, this._sprite._contentSize.height / 2);
                mpX = 0 | (centerPoint.x - this._sprite._anchorPointInPoints.x);
                context.translate(mpX, 0);
                context.scale(-1, 1);
            }

            if (this._flipY) {
                centerPoint = new cc.Point(this._sprite._contentSize.width / 2, this._sprite._contentSize.height / 2);
                mpY = -(0 | (centerPoint.y - this._sprite._anchorPointInPoints.y));
                context.translate(0, mpY);
                context.scale(1, -1);
            }

            var pos;
            if (this._type == cc.CCPROGRESS_TIMER_TYPE_BAR) {
                pos = new cc.Point(( -this._sprite._anchorPointInPoints.x + this._sprite._offsetPosition.x + this._drawPosition.x),
                    ( -this._sprite._anchorPointInPoints.y + this._sprite._offsetPosition.y + this._drawPosition.y));

                if (this._sprite._texture instanceof HTMLImageElement) {
                    context.drawImage(this._sprite._texture,
                        this._sprite._rect.origin.x + this._origin.x, this._sprite._rect.origin.y + this._origin.y,
                        this._originSize.width, this._originSize.height,
                        pos.x, -(pos.y + this._drawSize.height),
                        this._originSize.width, this._originSize.height);
                } else if (this._sprite._texture instanceof  HTMLCanvasElement) {
                    if (this._originSize.width == 0)
                        this._originSize.width = 0.1;
                    if (this._originSize.height == 0)
                        this._originSize.height = 0.1;
                    context.drawImage(this._sprite._texture,
                        this._origin.x, this._origin.y,
                        this._originSize.width, this._originSize.height,
                        pos.x, -(pos.y + this._drawSize.height),
                        this._originSize.width, this._originSize.height);
                }
            } else {
                var size = this._sprite.getContentSize();
                context.beginPath();
                context.arc(this._origin.x, this._origin.y, this._radius, (Math.PI / 180) * this._startAngle, (Math.PI / 180) * this._endAngle, false);
                context.lineTo(this._origin.x, this._origin.y);
                context.clip();
                context.closePath();

                var offsetPixels = this._sprite._offsetPosition;
                pos = new cc.Point(0 | ( -this._sprite._anchorPointInPoints.x + offsetPixels.x),
                    0 | ( -this._sprite._anchorPointInPoints.y + offsetPixels.y));

                if (this._sprite._texture instanceof HTMLImageElement) {
                    context.drawImage(this._sprite._texture,
                        this._sprite._rect.origin.x, this._sprite._rect.origin.y,
                        this._sprite._rect.size.width, this._sprite._rect.size.height,
                        pos.x, -(pos.y + this._sprite._rect.size.height),
                        this._sprite._rect.size.width, this._sprite._rect.size.height);
                } else if (this._sprite._texture instanceof  HTMLCanvasElement) {
                    context.drawImage(this._sprite._texture,
                        0, 0,
                        this._sprite._rect.size.width, this._sprite._rect.size.height,
                        pos.x, -(pos.y + this._sprite._rect.size.height),
                        this._sprite._rect.size.width, this._sprite._rect.size.height);
                }
            }
        } else {
            if (!this._vertexData || !this._sprite)
                return;
        }
        cc.INCREMENT_GL_DRAWS(1);
    }
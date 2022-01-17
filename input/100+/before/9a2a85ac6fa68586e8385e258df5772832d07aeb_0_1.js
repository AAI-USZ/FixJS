function (ctx) {
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            if (this._type > 1) {
                var pos = new cc.Point(0 | ( -this._anchorPointInPixels.x + this._drawPosition.x),
                    0 | ( -this._anchorPointInPixels.y + this._drawPosition.y));
                context.drawImage(this._sprite._texture, this._origin.x, this._origin.y, this._drawSize.width, this._drawSize.height,
                    pos.x, -(pos.y + this._drawSize.height),
                    this._drawSize.width, this._drawSize.height);
            } else {
                var size = this.getContentSize();
                context.beginPath();
                var startAngle_1 = (Math.PI / 180) * this._startAngle;
                var endAngle_1 = (Math.PI / 180) * this._endAngle;
                var radius = size.width > size.height ? size.width : size.height;
                context.arc(0, 0, radius, startAngle_1, endAngle_1, false);
                context.lineTo(0, 0);
                context.clip();
                context.closePath();

                var offsetPixels = this._sprite._offsetPositionInPixels;
                var pos = new cc.Point(0 | ( -this._sprite._anchorPointInPixels.x + offsetPixels.x),
                    0 | ( -this._sprite._anchorPointInPixels.y + offsetPixels.y));
                context.drawImage(this._sprite._texture,
                    this._sprite._rect.origin.x, this._sprite._rect.origin.y,
                    this._sprite._rect.size.width, this._sprite._rect.size.height,
                    pos.x, -(pos.y + this._sprite._rect.size.height),
                    this._sprite._rect.size.width, this._sprite._rect.size.height);
            }
        } else {
            this._super();

            if (!this._vertexData) {
                return;
            }

            if (!this._sprite) {
                return;
            }

            var bf = this._sprite.getBlendFunc();
            var newBlend = (bf.src != cc.BLEND_SRC || bf.dst != cc.BLEND_DST) ? true : false;
            if (newBlend) {
                //glBlendFunc(bf.src, bf.dst);
            }

            ///	========================================================================
            //	Replaced [texture_ drawAtPoint:CCPointZero] with my own vertexData
            //	Everything above me and below me is copied from CCTextureNode's draw
            //glBindTexture(GL_TEXTURE_2D, sprite->getTexture()->getName());
            //glVertexPointer(2, GL_FLOAT, sizeof(ccV2F_C4B_T2F), &vertexData[0].vertices);
            //glTexCoordPointer(2, GL_FLOAT, sizeof(ccV2F_C4B_T2F), &vertexData[0].texCoords);
            //glColorPointer(4, GL_UNSIGNED_BYTE, sizeof(ccV2F_C4B_T2F), &vertexData[0].colors);

            if (this._type == cc.CCPROGRESS_TIMER_RADIAL_CCW || this._type == cc.CCPROGRESS_TIMER_TYPE_RADIAL_CW) {
                //glDrawArrays(GL_TRIANGLE_FAN, 0, vertexDataCount);
            } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTATAL_BAR_LR ||
                this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTATAL_BAR_RL ||
                this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_BT ||
                this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_TB) {
                //glDrawArrays(GL_TRIANGLE_STRIP, 0, vertexDataCount);
            }
            //glDrawElements(GL_TRIANGLES, indicesCount_, GL_UNSIGNED_BYTE, indices_);
            ///	========================================================================

            if (newBlend) {
                //glBlendFunc(CC_BLEND_SRC, CC_BLEND_DST);
            }
        }
    }
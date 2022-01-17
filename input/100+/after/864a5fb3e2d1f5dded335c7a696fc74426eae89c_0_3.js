function () {
        var alpha = this._percentage / 100;

        var fXMax = Math.max(this._sprite.getQuad().br.texCoords.u, this._sprite.getQuad().bl.texCoords.u);
        var fXMin = Math.min(this._sprite.getQuad().br.texCoords.u, this._sprite.getQuad().bl.texCoords.u);
        var fYMax = Math.max(this._sprite.getQuad().tl.texCoords.v, this._sprite.getQuad().bl.texCoords.v);
        var fYMin = Math.min(this._sprite.getQuad().tl.texCoords.v, this._sprite.getQuad().bl.texCoords.v);
        var tMax = cc.ccp(fXMax, fYMax);
        var tMin = cc.ccp(fXMin, fYMin);

        var indexes = [];
        var index = 0;

        //	We know vertex data is always equal to the 4 corners
        //	If we don't have vertex data then we create it here and populate
        //	the side of the bar vertices that won't ever change.
        if (!this._vertexData) {
            this._vertexDataCount = cc.PROGRESS_TEXTURE_COORDS_COUNT;
            this._vertexData = [];
            for (var i = 0; i < this._vertexDataCount; i++) {
                this._vertexData[i] = cc.V2F_C4B_T2F_QuadZero();
            }
            cc.Assert(this._vertexData, "");

            if (this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_LR) {
                this._vertexData[indexes[0] = 0].texCoords = cc.tex2(tMin.x, tMin.y);
                this._vertexData[indexes[1] = 1].texCoords = cc.tex2(tMin.x, tMax.y);
            } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_RL) {
                this._vertexData[indexes[0] = 2].texCoords = cc.tex2(tMax.x, tMax.y);
                this._vertexData[indexes[1] = 3].texCoords = cc.tex2(tMax.x, tMin.y);
            } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_BT) {
                this._vertexData[indexes[0] = 1].texCoords = cc.tex2(tMin.x, tMax.y);
                this._vertexData[indexes[1] = 3].texCoords = cc.tex2(tMax.x, tMax.y);
            } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_TB) {
                this._vertexData[indexes[0] = 0].texCoords = cc.tex2(tMin.x, tMin.y);
                this._vertexData[indexes[1] = 2].texCoords = cc.tex2(tMax.x, tMin.y);
            }

            index = indexes[0];
            this._vertexData[index].vertices = this._vertexFromTexCoord(cc.ccp(this._vertexData[index].texCoords.u,
                this._vertexData[index].texCoords.v));

            index = indexes[1];
            this._vertexData[index].vertices = this._vertexFromTexCoord(cc.ccp(this._vertexData[index].texCoords.u,
                this._vertexData[index].texCoords.v));

            if (this._sprite.isFlipY() || this._sprite.isFlipX()) {
                if (this._sprite.isFlipX()) {
                    index = indexes[0];
                    this._vertexData[index].texCoords.u = tMin.x + tMax.x - this._vertexData[index].texCoords.u;
                    index = indexes[1];
                    this._vertexData[index].texCoords.u = tMin.x + tMax.x - this._vertexData[index].texCoords.u;
                }

                if (this._sprite.isFlipY()) {
                    index = indexes[0];
                    this._vertexData[index].texCoords.v = tMin.y + tMax.y - this._vertexData[index].texCoords.v;
                    index = indexes[1];
                    this._vertexData[index].texCoords.v = tMin.y + tMax.y - this._vertexData[index].texCoords.v;
                }
            }

            this._updateColor();
        }

        if (this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_LR) {
            this._vertexData[indexes[0] = 3].texCoords = cc.tex2(tMin.x + (tMax.x - tMin.x) * alpha, tMax.y);
            this._vertexData[indexes[1] = 2].texCoords = cc.tex2(tMin.x + (tMax.x - tMin.x) * alpha, tMin.y);
        } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_HORIZONTAL_BAR_RL) {
            this._vertexData[indexes[0] = 1].texCoords = cc.tex2(tMin.x + (tMax.x - tMin.x) * (1.0 - alpha), tMin.y);
            this._vertexData[indexes[1] = 0].texCoords = cc.tex2(tMin.x + (tMax.x - tMin.x) * (1.0 - alpha), tMax.y);
        } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_BT) {
            this._vertexData[indexes[0] = 0].texCoords = cc.tex2(tMin.x, tMin.y + (tMax.y - tMin.y) * (1.0 - alpha));
            this._vertexData[indexes[1] = 2].texCoords = cc.tex2(tMax.x, tMin.y + (tMax.y - tMin.y) * (1.0 - alpha));
        } else if (this._type == cc.CCPROGRESS_TIMER_TYPE_VERTICAL_BAR_TB) {
            this._vertexData[indexes[0] = 1].texCoords = cc.tex2(tMin.x, tMin.y + (tMax.y - tMin.y) * alpha);
            this._vertexData[indexes[1] = 3].texCoords = cc.tex2(tMax.x, tMin.y + (tMax.y - tMin.y) * alpha);
        }

        index = indexes[0];
        this._vertexData[index].vertices = this._vertexFromTexCoord(cc.ccp(this._vertexData[index].texCoords.u,
            this._vertexData[index].texCoords.v));
        index = indexes[1];
        this._vertexData[index].vertices = this._vertexFromTexCoord(cc.ccp(this._vertexData[index].texCoords.u,
            this._vertexData[index].texCoords.v));

        if (this._sprite.isFlipY() || this._sprite.isFlipX()) {
            if (this._sprite.isFlipX()) {
                index = indexes[0];
                this._vertexData[index].texCoords.u = tMin.x + tMax.x - this._vertexData[index].texCoords.u;
                index = indexes[1];
                this._vertexData[index].texCoords.u = tMin.x + tMax.x - this._vertexData[index].texCoords.u;
            }

            if (this._sprite.isFlipY()) {
                index = indexes[0];
                this._vertexData[index].texCoords.v = tMin.y + tMax.y - this._vertexData[index].texCoords.v;
                index = indexes[1];
                this._vertexData[index].texCoords.v = tMin.y + tMax.y - this._vertexData[index].texCoords.v;
            }
        }

    }
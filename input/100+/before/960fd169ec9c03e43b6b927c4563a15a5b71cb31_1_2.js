function (texCoord) {
        var tmp;
        var ret = new cc.Vertex2F(0, 0);

        var texture = this._sprite.getTexture();
        if (texture) {
            var fXMax = Math.max(this._sprite.getQuad().br.texCoords.u, this._sprite.getQuad().bl.texCoords.u);
            var fXMin = Math.min(this._sprite.getQuad().br.texCoords.u, this._sprite.getQuad().bl.texCoords.u);
            var fYMax = Math.max(this._sprite.getQuad().tl.texCoords.v, this._sprite.getQuad().bl.texCoords.v);
            var fYMin = Math.min(this._sprite.getQuad().tl.texCoords.v, this._sprite.getQuad().bl.texCoords.v);
            var tMax = cc.ccp(fXMax, fYMax);
            var tMin = cc.ccp(fXMin, fYMin);

            var texSize = cc.SizeMake(this._sprite.getQuad().br.vertices.x - this._sprite.getQuad().bl.vertices.x,
                this._sprite.getQuad().tl.vertices.y - this._sprite.getQuad().bl.vertices.y);
            tmp = cc.ccp(texSize.width * (texCoord.x - tMin.x) / (tMax.x - tMin.x),
                texSize.height * (1 - (texCoord.y - tMin.y) / (tMax.y - tMin.y)));
        } else {
            tmp = cc.PointZero();
        }

        ret.x = tmp.x;
        ret.y = tmp.y;
        return ret;

    }
function (alpha) {
        var ret = new cc.Tex2F(0, 0);
        if (!this._sprite) {
            return ret;
        }
        var quad = this._sprite.getQuad();
        var min = cc.ccp(quad.bl.texCoords.u, quad.bl.texCoords.v);
        var max = cc.ccp(quad.tr.texCoords.u, quad.tr.texCoords.v);

        //  Fix bug #1303 so that progress timer handles sprite frame texture rotation
        if (this._sprite.isTextureRectRotated()) {
            var tempX = alpha.x;
            alpha.x = alpha.y;
            alpha.y = tempX;
        }
        return new cc.Tex2F(min.x * (1 - alpha.x) + max.x * alpha.x, min.y * (1 - alpha.y) + max.y * alpha.y);
    }
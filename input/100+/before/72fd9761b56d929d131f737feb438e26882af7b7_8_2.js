function (pointRect) {
        // convert to pixels coords
        var rect = cc.RectMake(
            pointRect.origin.x * cc.CONTENT_SCALE_FACTOR(),
            pointRect.origin.y * cc.CONTENT_SCALE_FACTOR(),
            pointRect.size.width * cc.CONTENT_SCALE_FACTOR(),
            pointRect.size.height * cc.CONTENT_SCALE_FACTOR());

        var wide = pointRect.size.width;
        var high = pointRect.size.height;

        if (this._texture) {
            if ((this._texture instanceof HTMLImageElement) || (this._texture instanceof HTMLCanvasElement)) {
                wide = this._texture.width;
                high = this._texture.height;
            } else {
                wide = this._texture.getPixelsWide();
                high = this._texture.getPixelsHigh();
            }
        }

        var left, bottom, right, top;
        if (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL) {
            left = (rect.origin.x * 2 + 1) / (wide * 2);
            bottom = (rect.origin.y * 2 + 1) / (high * 2);
            right = left + (rect.size.width * 2 - 2) / (wide * 2);
            top = bottom + (rect.size.height * 2 - 2) / (high * 2);
        } else {
            left = rect.origin.x / wide;
            bottom = rect.origin.y / high;
            right = left + rect.size.width / wide;
            top = bottom + rect.size.height / high;
        }

        // Important. Texture in cocos2d are inverted, so the Y component should be inverted
        var temp = top;
        top = bottom;
        bottom = temp;

        this._quads = [];
        for (var i = 0; i < this._totalParticles; i++) {
            this._quads[i] = cc.V3F_C4B_T2F_QuadZero();
        }

        for (var i = 0; i < this._totalParticles; i++) {
            // bottom-left vertex:
            this._quads[i].bl.texCoords.u = left;
            this._quads[i].bl.texCoords.v = bottom;
            // bottom-right vertex:
            this._quads[i].br.texCoords.u = right;
            this._quads[i].br.texCoords.v = bottom;
            // top-left vertex:
            this._quads[i].tl.texCoords.u = left;
            this._quads[i].tl.texCoords.v = top;
            // top-right vertex:
            this._quads[i].tr.texCoords.u = right;
            this._quads[i].tr.texCoords.v = top;
        }
    }
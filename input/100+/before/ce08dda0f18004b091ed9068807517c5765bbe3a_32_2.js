function () {
        var op = this._sprite.getOpacity();
        var c3b = this._sprite.getColor();

        var color = new cc.Color4B(c3b.r, c3b.g, c3b.b, op);
        if ((this._sprite.getTexture() instanceof HTMLImageElement) || (this._sprite.getTexture() instanceof HTMLCanvasElement)) {
            color.r *= op / 255;
            color.g *= op / 255;
            color.b *= op / 255;
        } else {
            if (this._sprite.getTexture().getHasPremultipliedAlpha()) {
                color.r *= op / 255;
                color.g *= op / 255;
                color.b *= op / 255;
            }
        }

        if (this._vertexData) {
            for (var i = 0; i < this._vertexDataCount; ++i) {
                this._vertexData[i].colors = color;
            }
        }

    }
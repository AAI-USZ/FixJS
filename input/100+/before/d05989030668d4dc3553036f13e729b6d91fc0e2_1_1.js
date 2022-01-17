function () {
        var n = this._string.length;

        var s = this._string;
        var texture = this._textureAtlas.getTexture();

        var textureWide = texture.width;
        var textureHigh = texture.height;

        for (var i = 0; i < n; i++) {
            var a = s.charCodeAt(i) - this._mapStartChar.charCodeAt(0);
            var row = parseInt(a % this._itemsPerRow);
            var col = parseInt(a / this._itemsPerRow);

            var left = row * this._itemWidth / textureWide;
            var right = left + this._itemWidth / textureWide;
            var top = col * this._itemHeight / textureHigh;
            var bottom = top + this._itemHeight / textureHigh;

            var quad = new cc.V2F_C4B_T2F_QuadZero();
            quad.tl.texCoords.u = left;
            quad.tl.texCoords.v = top;
            quad.tr.texCoords.u = right;
            quad.tr.texCoords.v = top;
            quad.bl.texCoords.u = left;
            quad.bl.texCoords.v = bottom;
            quad.br.texCoords.u = right;
            quad.br.texCoords.v = bottom;

            quad.bl.vertices.x = i * this._itemWidth;
            quad.bl.vertices.y = 0;
            quad.bl.vertices.z = 0.0;
            quad.br.vertices.x = i * this._itemWidth + this._itemWidth;
            quad.br.vertices.y = 0;
            quad.br.vertices.z = 0.0;
            quad.tl.vertices.x = i * this._itemWidth;
            quad.tl.vertices.y = this._itemHeight;
            quad.tl.vertices.z = 0.0;
            quad.tr.vertices.x = i * this._itemWidth + this._itemWidth;
            quad.tr.vertices.y = this._itemHeight;
            quad.tr.vertices.z = 0.0;

            this._textureAtlas.updateQuad(quad, i);
        }
    }
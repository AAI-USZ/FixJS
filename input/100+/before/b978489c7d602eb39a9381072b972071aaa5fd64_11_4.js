function () {
        //todo need fixed for webGL
        this._super();
        /*
         this._squareColors[0].r = Math.round(this._startColor.r);
         this._squareColors[0].g = Math.round(this._startColor.g);
         this._squareColors[0].b = Math.round(this._startColor.b);
         this._squareColors[0].a = Math.round(this._startColor.a);

         this._squareColors[3].r = Math.round(this._endColor.r);
         this._squareColors[3].g = Math.round(this._endColor.g);
         this._squareColors[3].b = Math.round(this._endColor.b);
         this._squareColors[3].a = Math.round(this._endColor.a);
         return;
         */


        var h = cc.ccpLength(this.alongVector);
        if (h == 0)
            return;

        var c = Math.sqrt(2.0);
        var u = new cc.Point();
        u = cc.ccp(this.alongVector.x / h, this.alongVector.y / h);

        // Compressed Interpolation mode
        if (this._compressedInterpolation) {
            var h2 = 1 / ( Math.abs(u.x) + Math.abs(u.y) );
            u = cc.ccpMult(u, h2 * c);
        }

        var opacityf = this._opacity / 255.0;

        var S = new cc.Color4B(this._startColor.r, this._startColor.g, this._startColor.b, this._startOpacity * opacityf);

        var E = new cc.Color4B(this._endColor.r, this._endColor.g, this._endColor.b, this._endOpacity * opacityf);

        // (-1, -1)
        this._squareColors[0].r = parseInt((E.r + (S.r - E.r) * ((c + u.x + u.y) / (2.0 * c))));
        this._squareColors[0].g = parseInt((E.g + (S.g - E.g) * ((c + u.x + u.y) / (2.0 * c))));
        this._squareColors[0].b = parseInt((E.b + (S.b - E.b) * ((c + u.x + u.y) / (2.0 * c))));
        this._squareColors[0].a = parseInt((E.a + (S.a - E.a) * ((c + u.x + u.y) / (2.0 * c))));
        // (1, -1)
        this._squareColors[1].r = parseInt((E.r + (S.r - E.r) * ((c - u.x + u.y) / (2.0 * c))));
        this._squareColors[1].g = parseInt((E.g + (S.g - E.g) * ((c - u.x + u.y) / (2.0 * c))));
        this._squareColors[1].b = parseInt((E.b + (S.b - E.b) * ((c - u.x + u.y) / (2.0 * c))));
        this._squareColors[1].a = parseInt((E.a + (S.a - E.a) * ((c - u.x + u.y) / (2.0 * c))));
        // (-1, 1)
        this._squareColors[2].r = parseInt((E.r + (S.r - E.r) * ((c + u.x - u.y) / (2.0 * c))));
        this._squareColors[2].g = parseInt((E.g + (S.g - E.g) * ((c + u.x - u.y) / (2.0 * c))));
        this._squareColors[2].b = parseInt((E.b + (S.b - E.b) * ((c + u.x - u.y) / (2.0 * c))));
        this._squareColors[2].a = parseInt((E.a + (S.a - E.a) * ((c + u.x - u.y) / (2.0 * c))));
        // (1, 1)
        this._squareColors[3].r = parseInt((E.r + (S.r - E.r) * ((c - u.x - u.y) / (2.0 * c))));
        this._squareColors[3].g = parseInt((E.g + (S.g - E.g) * ((c - u.x - u.y) / (2.0 * c))));
        this._squareColors[3].b = parseInt((E.b + (S.b - E.b) * ((c - u.x - u.y) / (2.0 * c))));
        this._squareColors[3].a = parseInt((E.a + (S.a - E.a) * ((c - u.x - u.y) / (2.0 * c))));
    }
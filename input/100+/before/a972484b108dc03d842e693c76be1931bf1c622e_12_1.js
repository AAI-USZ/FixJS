function (gridSize, texture, flipped) {
        var argnum = arguments.length;
        if (argnum = 1) {
            var director = cc.Director.getInstance();
            var s = director.getWinSizeInPixels();

            var POTWide = cc.NextPOT(s.width);
            var POTHigh = cc.NextPOT(s.height);

            // we only use rgba8888
            var format = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;

            var pTextureTemp = new cc.Texture2D();
            pTextureTemp.initWithData(format, POTWide, POTHigh, s);
            if (!pTextureTemp) {
                cc.Log("cocos2d: CCGrid: error creating texture");
                return false;
            }
            texture = pTextureTemp;

            flipped = false;
        }


        var ret = true;

        this._active = false;
        this._reuseGrid = 0;
        this._gridSize = gridSize;
        this._texture = texture;
        this._isTextureFlipped = flipped;

        var texSize = this._texture.getContentSizeInPixels();
        this._step.x = texSize.width / this._gridSize.x;
        this._step.y = texSize.height / this._gridSize.y;

        this._grabber = new cc.Grabber();
        if (this._grabber) {
            this._grabber.grab(this._texture);
        }
        else {
            ret = false;
        }


        this.calculateVertexPoints();

        return ret;

    }
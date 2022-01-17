function (texture, rect) {
        var argnum = arguments.length;
        if (argnum == 0)
            throw "Sprite.initWithTexture(): Argument must be non-nil ";

        cc.Assert(texture != null, "");

        if (argnum == 1) {
            rect = new cc.Rect();
            if (texture instanceof cc.Texture2D)
                rect.size = texture.getContentSize();
            else if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement))
                rect.size = new cc.Size(texture.width, texture.height);
        }

        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = texture;
        }
        // IMPORTANT: [self init] and not [super init];
        this.init();
        this.setTexture(texture);
        this.setTextureRect(rect);
        return true;
    }
function (fileName) {
        this._super();
        if (fileName) {
            if (typeof(fileName) == "string") {
                var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(fileName);
                this.initWithSpriteFrame(frame);
            } else if (typeof(fileName) == "object") {
                if (fileName instanceof cc.SpriteFrame) {
                    this.initWithSpriteFrame(fileName);
                } else if (fileName instanceof cc.SpriteBatchNode) {
                    if (arguments.length > 1) {
                        var rect = arguments[1];
                        if (rect instanceof cc.Rect) {
                            this.initWithBatchNode(fileName, rect);
                        }
                    }
                } else if ((fileName instanceof HTMLImageElement) || (fileName instanceof HTMLCanvasElement)) {
                    this.initWithTexture(fileName)
                } else if (fileName instanceof cc.Texture2D) {
                    this.initWithTexture(fileName)
                }
            }
        }
    }
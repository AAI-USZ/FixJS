function (fileImage) {
        this._super();
        if (fileImage) {
            this.initWithFile(fileImage, cc.DEFAULT_SPRITE_BATCH_CAPACITY);
        }
        this._renderTexture = cc.RenderTexture.create(cc.canvas.width, cc.canvas.height);
        this.setContentSize(new cc.Size(cc.canvas.width, cc.canvas.height));
    }
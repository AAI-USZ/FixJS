function () {
        var size = cc.Director.sharedDirector().getWinSize();

        this._labelLoading = cc.LabelTTF.create("loading...", "Arial", 15);
        this._labelPercent = cc.LabelTTF.create("%0", "Arial", 15);

        this._labelLoading.setPosition(cc.PointMake(size.width / 2, size.height / 2 - 20));
        this._labelPercent.setPosition(cc.PointMake(size.width / 2, size.height / 2 + 20));

        this.addChild(this._labelLoading);
        this.addChild(this._labelPercent);

        // load textrues
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/HelloHTML5World.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_01.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_02.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_03.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_04.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_05.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_06.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_07.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_08.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_09.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_10.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_11.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_12.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_13.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/grossini_dance_14.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/background1.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/background2.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/background3.png", this, this.loadingCallBack);
        cc.TextureCache.sharedTextureCache().addImageAsync("res/Images/blocks.png", this, this.loadingCallBack);
    }
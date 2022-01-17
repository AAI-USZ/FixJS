function () {
        if(this._texture){
            return this._texture;
        }
        if(this._textureFilename != ""){
            return cc.TextureCache.sharedTextureCache().addImage(this._textureFilename);
        }
        return null;
    }
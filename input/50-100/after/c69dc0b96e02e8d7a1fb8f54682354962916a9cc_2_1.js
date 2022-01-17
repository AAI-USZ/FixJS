function (jsonData) {
        var dict = jsonData;
        var texturePath = "";

        var metadataDict = dict["metadata"];
        if (metadataDict) {
            // try to read  texture file name from meta data
            texturePath = this._valueForKey("textureFileName", metadataDict);
            texturePath = texturePath.toString();
        }

        var texture = cc.TextureCache.sharedTextureCache().addImage(texturePath);
        if (texture) {
            this._addSpriteFramesWithDictionary(dict, texture);
        }
        else {
            cc.Log("cocos2d: cc.SpriteFrameCache: Couldn't load texture");
        }
    }
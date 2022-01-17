function (path) {
        cc.Assert(path != null, "TextureCache: file image MUST not be null");

        var key = path;

        if (this.textures[key] != null) {
            return this.textures[key];
        }

        // Split up directory and filename
        var tex = new cc.Texture2D();
        if (tex.initWithPVRFile(key)) {
            this.textures[key] = tex;
        } else {
            cc.log("cocos2d: Couldn't add PVRImage:" + key + " in TextureCache");
        }

        return tex;
    }
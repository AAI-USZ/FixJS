function (plist, texture) {
        var argnum = arguments.length;
        var dict = cc.FileUtils.dictionaryWithContentsOfFileThreadSafe(plist);

        switch (argnum) {
            case 1:
                var texturePath = "";
                var metadataDict = dict["metadata"];
                if (metadataDict) {
                    // try to read  texture file name from meta data
                    texturePath = this._valueForKey("textureFileName", metadataDict).toString();
                }
                if (texturePath != "") {
                    // build texture path relative to plist file
                    var getIndex = plist.lastIndexOf('/'), pszPath;
                    pszPath = getIndex ? plist.substring(0, getIndex + 1) : "";
                    texturePath = pszPath + texturePath;
                } else {
                    // build texture path by replacing file extension
                    texturePath = plist;

                    // remove .xxx
                    var startPos = texturePath.lastIndexOf(".", texturePath.length);
                    texturePath = texturePath.substr(0, startPos);

                    // append .png
                    texturePath = texturePath + ".png";
                    cc.Log("cocos2d: cc.SpriteFrameCache: Trying to use file " + texturePath.toString() + " as texture");
                }

                var texture = cc.TextureCache.sharedTextureCache().addImage(texturePath);
                if (texture) {
                    this.addSpriteFramesWithDictionary(dict, texture);
                }
                else {
                    cc.Log("cocos2d: cc.SpriteFrameCache: Couldn't load texture");
                }

                break;
            case 2:
                if (arguments[1] instanceof cc.Texture2D) {
                    /** Adds multiple Sprite Frames from a plist file. The texture will be associated with the created sprite frames. */
                    this.addSpriteFramesWithDictionary(dict, texture);
                } else {
                    /** Adds multiple Sprite Frames from a plist file. The texture will be associated with the created sprite frames.
                     @since v0.99.5
                     */
                    var plist = arguments[0];
                    var textureFileName = arguments[1];
                    cc.Assert(textureFileName, "texture name should not be null");
                    var texture = cc.TextureCache.sharedTextureCache().addImage(textureFileName);

                    if (texture) {
                        this.addSpriteFramesWithDictionary(dict, texture);
                    }
                    else {
                        cc.Log("cocos2d: cc.SpriteFrameCache: couldn't load texture file. File not found " + textureFileName);
                    }
                }
                break;
            default:
                throw "Argument must be non-nil ";
        }
    }
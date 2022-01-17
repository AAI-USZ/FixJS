function (plist, texture) {
        var dict = cc.FileUtils.getInstance().dictionaryWithContentsOfFileThreadSafe(plist);

        switch (arguments.length) {
            case 1:
                cc.Assert(plist, "plist filename should not be NULL");
                if (!cc.ArrayContainsObject(this._loadedFileNames, plist)) {
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

                    var getTexture = cc.TextureCache.getInstance().addImage(texturePath);
                    if (getTexture) {
                        this._addSpriteFramesWithDictionary(dict, getTexture);
                    } else {
                        cc.Log("cocos2d: cc.SpriteFrameCache: Couldn't load texture");
                    }
                }
                break;
            case 2:
                if ((texture instanceof cc.Texture2D) || (texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement)) {
                    /** Adds multiple Sprite Frames from a plist file. The texture will be associated with the created sprite frames. */
                    this._addSpriteFramesWithDictionary(dict, texture);
                } else {
                    /** Adds multiple Sprite Frames from a plist file. The texture will be associated with the created sprite frames.
                     @since v0.99.5
                     */
                    var textureFileName = texture;
                    cc.Assert(textureFileName, "texture name should not be null");
                    var gTexture = cc.TextureCache.getInstance().addImage(textureFileName);

                    if (gTexture) {
                        this._addSpriteFramesWithDictionary(dict, gTexture);
                    } else {
                        cc.Log("cocos2d: cc.SpriteFrameCache: couldn't load texture file. File not found " + textureFileName);
                    }
                }
                break;
            default:
                throw "Argument must be non-nil ";
        }
    }
function (dictionary, texture) {
        var metadataDict = dictionary["metadata"];
        var framesDict = dictionary["frames"];
        var format = 0;
        // get the format
        if (metadataDict != null) {
            format = parseInt(this._valueForKey("format", metadataDict));
        }

        // check the format
        cc.Assert(format >= 0 && format <= 3, "format is not supported for cc.SpriteFrameCache addSpriteFramesWithDictionary:textureFilename:");

        for (var key in framesDict) {
            var frameDict = framesDict[key];
            if (frameDict) {
                var spriteFrame = this._spriteFrames[key];
                if (spriteFrame) {
                    continue;
                }

                if (format == 0) {
                    var x = parseFloat(this._valueForKey("x", frameDict));
                    var y = parseFloat(this._valueForKey("y", frameDict));
                    var w = parseFloat(this._valueForKey("width", frameDict));
                    var h = parseFloat(this._valueForKey("height", frameDict));
                    var ox = parseFloat(this._valueForKey("offsetX", frameDict));
                    var oy = parseFloat(this._valueForKey("offsetY", frameDict));
                    var ow = parseInt(this._valueForKey("originalWidth", frameDict));
                    var oh = parseInt(this._valueForKey("originalHeight", frameDict));
                    // check ow/oh
                    if (!ow || !oh) {
                        cc.log("cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist");
                    }
                    // Math.abs ow/oh
                    ow = Math.abs(ow);
                    oh = Math.abs(oh);
                    // create frame
                    spriteFrame = new cc.SpriteFrame();
                    spriteFrame.initWithTexture(texture, cc.RectMake(x, y, w, h), false, cc.p(ox, oy), cc.SizeMake(ow, oh));
                } else if (format == 1 || format == 2) {
                    var frame = cc.RectFromString(this._valueForKey("frame", frameDict));
                    var rotated = false;

                    // rotation
                    if (format == 2) {
                        rotated = this._valueForKey("rotated", frameDict) == "true";
                    }
                    var offset = cc.PointFromString(this._valueForKey("offset", frameDict));
                    var sourceSize = cc.SizeFromString(this._valueForKey("sourceSize", frameDict));
                    // create frame
                    spriteFrame = new cc.SpriteFrame();
                    spriteFrame.initWithTexture(texture, frame, rotated, offset, sourceSize);
                } else if (format == 3) {
                    // get values
                    var spriteSize, spriteOffset,spriteSourceSize,textureRect, textureRotated;
                    if(frameDict.hasOwnProperty("spriteSize")){
                        spriteSize = cc.SizeFromString(this._valueForKey("spriteSize", frameDict));
                        spriteOffset = cc.PointFromString(this._valueForKey("spriteOffset", frameDict));
                        spriteSourceSize = cc.SizeFromString(this._valueForKey("spriteSourceSize", frameDict));
                        textureRect = cc.RectFromString(this._valueForKey("textureRect", frameDict));
                        textureRotated = this._valueForKey("textureRotated", frameDict) == "true";
                    } else {
                        spriteSize = cc.RectFromString(this._valueForKey("frame", frameDict));
                        spriteOffset = cc.PointFromString(this._valueForKey("offset", frameDict));
                        spriteSourceSize = cc.SizeFromString(this._valueForKey("sourceSize", frameDict));
                        textureRect = cc.SizeFromString(this._valueForKey("sourceSize", frameDict));
                        textureRotated = this._valueForKey("rotated", frameDict) == "true";
                    }

                    // get aliases
                    var aliases = frameDict["aliases"];
                    var frameKey = key.toString();

                    for (var aliasKey in aliases) {
                        if (this._spriteFramesAliases.hasOwnProperty(aliases[aliasKey])) {
                            cc.log("cocos2d: WARNING: an alias with name " + aliasKey + " already exists");
                        }
                        this._spriteFramesAliases[aliases[aliasKey]] = frameKey;
                    }

                    // create frame
                    spriteFrame = new cc.SpriteFrame();
                    if(frameDict.hasOwnProperty("spriteSize")){
                        spriteFrame.initWithTexture(texture,
                            cc.RectMake(textureRect.origin.x, textureRect.origin.y, spriteSize.width, spriteSize.height),
                            textureRotated,
                            spriteOffset,
                            spriteSourceSize);
                    } else {
                        spriteFrame.initWithTexture(texture, spriteSize, textureRotated, spriteOffset, spriteSourceSize);
                    }
                }

                if (spriteFrame.isRotated()) {
                    //clip to canvas
                    var tempTexture = cc.cutRotateImageToCanvas(spriteFrame.getTexture(),spriteFrame.getRect());
                    var rect = spriteFrame.getRect();
                    spriteFrame.setRect(new cc.Rect(0, 0, rect.size.width, rect.size.height));
                    spriteFrame.setTexture(tempTexture);
                }

                // add sprite frame
                this._spriteFrames[key] = spriteFrame;
            }
        }
    }
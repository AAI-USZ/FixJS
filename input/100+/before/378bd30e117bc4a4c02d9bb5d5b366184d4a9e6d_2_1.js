function (dictionary, texture) {
        var metadataDict = dictionary["metadata"];
        var framesDict = dictionary["frames"];
        var format = 0;
        // get the format
        if (metadataDict != null) {
            format = parseInt(this._valueForKey("format", metadataDict));
        }

        // check the format
        cc.Assert(format >= 0 && format <= 3, "");

        var frameDict = null;
        for (var key in framesDict) {
            frameDict = framesDict[key];
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
                        cc.Log("cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist");
                    }
                    // Math.abs ow/oh
                    ow = Math.abs(ow);
                    oh = Math.abs(oh);
                    // create frame
                    spriteFrame = new cc.SpriteFrame();
                    spriteFrame.initWithTexture(texture, cc.RectMake(x, y, w, h), false, cc.PointMake(ox, oy), cc.SizeMake(ow, oh));
                }
                else if (format == 1 || format == 2) {
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
                }
                else if (format == 3) {
                    // get values
                    var spriteSize = new cc.Size(), spriteOffset = new cc.Point(), spriteSourceSize = new cc.Size(), textureRect = new cc.Rect();
                    spriteSize = cc.SizeFromString(this._valueForKey("spriteSize", frameDict));
                    spriteOffset = cc.PointFromString(this._valueForKey("spriteOffset", frameDict));
                    spriteSourceSize = cc.SizeFromString(this._valueForKey("spriteSourceSize", frameDict));
                    textureRect = cc.RectFromString(this._valueForKey("textureRect", frameDict));
                    var textureRotated = this._valueForKey("textureRotated", frameDict) == "true";

                    // get aliases
                    var aliases = frameDict["aliases"];
                    var frameKey = key.toString();
                    for (var i in aliases) {
                        if (this._spriteFramesAliases.hasOwnProperty(aliases[i])) {
                            cc.Log("cocos2d: WARNING: an alias with name " + i + " already exists");
                        }
                        this._spriteFramesAliases[aliases[i]] = frameKey;
                    }
                    // create frame
                    spriteFrame = new cc.SpriteFrame();
                    spriteFrame.initWithTexture(texture,
                        cc.RectMake(textureRect.origin.x, textureRect.origin.y, spriteSize.width, spriteSize.height),
                        textureRotated,
                        spriteOffset,
                        spriteSourceSize);
                }

                if (spriteFrame.isRotated()) {
                    var rect = spriteFrame.getRect();
                    spriteFrame.setRect(new cc.Rect(rect.origin.x, rect.origin.y, rect.size.height, rect.size.width));
                }

                // add sprite frame
                this._spriteFrames[key] = spriteFrame;
            }
        }
    }
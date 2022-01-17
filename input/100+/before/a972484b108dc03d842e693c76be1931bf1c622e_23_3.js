function (name) {
        var frame;
        if (this._spriteFrames.hasOwnProperty(name)) {
            frame = this._spriteFrames[name];
        }

        if (!frame) {
            // try alias dictionary
            var key;
            if (this._spriteFramesAliases.hasOwnProperty(name)) {
                key = this._spriteFramesAliases[name];
            }
            if (key) {
                if (this._spriteFrames.hasOwnProperty(key.toString())) {
                    frame = this._spriteFrames[key.toString()];
                }
                if (!frame) {
                    cc.Log("cocos2d: cc.SpriteFrameCahce: Frame " + name + " not found");
                }
            }
        }
        return frame;
    }
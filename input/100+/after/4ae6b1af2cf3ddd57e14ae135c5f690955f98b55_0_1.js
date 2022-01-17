function (arg) {
        var label, textureFilename, width, height, startChar;
        if (arg.length == 2) {
            var dict = cc.FileUtils.sharedFileUtils().dictionaryWithContentsOfFileThreadSafe(arg[1]);
            cc.Assert(parseInt(dict["version"]) == 1, "Unsupported version. Upgrade cocos2d version");

            label = arg[0].toString();
            textureFilename = cc.FileUtils.sharedFileUtils().fullPathFromRelativeFile(dict["textureFilename"], arg[1]);
            width = parseInt(dict["itemWidth"]) / cc.CONTENT_SCALE_FACTOR();
            height = parseInt(dict["itemHeight"]) / cc.CONTENT_SCALE_FACTOR();
            startChar = String.fromCharCode(parseInt(dict["firstChar"]));
        }
        else {
            label = arg[0].toString();
            textureFilename = arg[1];
            width = arg[2];
            height = arg[3];
            startChar = arg[4];
            cc.Assert(label != null, "Label must be non-nil");
        }

        if (this.initWithTileFile(textureFilename, width, height, label.length)) {
            this._mapStartChar = startChar;
            this.setString(label);
            return true;
        }
        return false;
    }
function (plistFile) {
        var ret = false;
        //TODO
        this._plistFile = plistFile;
        var dict = cc.FileUtils.sharedFileUtils().dictionaryWithContentsOfFileThreadSafe(this._plistFile);

        cc.Assert(dict != null, "Particles: file not found");
        return this.initWithDictionary(dict);
    }
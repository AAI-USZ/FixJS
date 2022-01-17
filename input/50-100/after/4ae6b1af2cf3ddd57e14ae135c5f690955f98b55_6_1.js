function (plist) {
        cc.Assert( plist, "Invalid texture file name");

        var path = cc.FileUtils.sharedFileUtils().fullPathFromRelativePath(plist);
        var dict = cc.FileUtils.sharedFileUtils().dictionaryWithContentsOfFileThreadSafe(path);

        cc.Assert( dict, "cc.AnimationCache: File could not be found");

        this.addAnimationsWithDictionary(dict);
    }
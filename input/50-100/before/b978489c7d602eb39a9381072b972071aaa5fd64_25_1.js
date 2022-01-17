function (plist) {
        cc.Assert( plist, "Invalid texture file name");

        var path = cc.FileUtils.fullPathFromRelativePath(plist);
        var dict = cc.FileUtils.dictionaryWithContentsOfFileThreadSafe(path);

        cc.Assert( dict, "cc.AnimationCache: File could not be found");

        this.addAnimationsWithDictionary(dict);
    }
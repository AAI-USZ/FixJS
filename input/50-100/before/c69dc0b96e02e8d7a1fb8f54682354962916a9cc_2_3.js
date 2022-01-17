function (plist) {
        var path = cc.FileUtils.fullPathFromRelativePath(plist);
        var dict = cc.FileUtils.dictionaryWithContentsOfFileThreadSafe(path);

        this.removeSpriteFramesFromDictionary(dict);
    }
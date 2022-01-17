function (plist) {
        var path = cc.FileUtils.sharedFileUtils().fullPathFromRelativePath(plist);
        var dict = cc.FileUtils.sharedFileUtils().dictionaryWithContentsOfFileThreadSafe(path);

        this._removeSpriteFramesFromDictionary(dict);

        //remove it from the cache
         if (cc.ArrayContainsObject(this._loadedFileNames,plist)){
             cc.ArrayRemoveObject(plist);
         }
    }
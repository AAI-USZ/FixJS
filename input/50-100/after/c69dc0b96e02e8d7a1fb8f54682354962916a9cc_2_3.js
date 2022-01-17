function (plist) {
        var path = cc.FileUtils.fullPathFromRelativePath(plist);
        var dict = cc.FileUtils.dictionaryWithContentsOfFileThreadSafe(path);

        this._removeSpriteFramesFromDictionary(dict);

        //remove it from the cache
         if (cc.ArrayContainsObject(this._loadedFileNames,plist)){
             cc.ArrayRemoveObject(plist);
         }
    }
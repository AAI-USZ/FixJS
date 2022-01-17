function (tmxFileName, resourcePath) {
        this._tileSets = [];
        this._layers = [];

        this._TMXFileName = cc.FileUtils.sharedFileUtils().fullPathFromRelativePath(tmxFileName);

        if (resourcePath) {
            this._resources = resourcePath;
        }

        this._objectGroups = [];

        this._properties = [];
        this._tileProperties = [];

        // tmp vars
        this._currentString = "";
        this._storingCharacters = false;
        this._layerAttribs = cc.TMXLayerAttribNone;
        this._parentElement = cc.TMXPropertyNone;
    }
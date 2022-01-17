function (tmxFile) {
        this._tileSets = [];
        this._layers = [];
        this._TMXFileName = tmxFile;
        this._objectGroups = [];
        this._properties = [];
        this._tileProperties = [];

        // tmp vars
        this._currentString = "";
        this._storingCharacters = false;
        this._layerAttribs = cc.TMXLayerAttribNone;
        this._parentElement = cc.TMXPropertyNone;

        return this.parseXMLFile(this._TMXFileName);
    }
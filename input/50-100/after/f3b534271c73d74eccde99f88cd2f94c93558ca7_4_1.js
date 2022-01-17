function (tmxFile) {
        this._internalInit(tmxFile, null);
        return this.parseXMLFile(this._TMXFileName);
    }
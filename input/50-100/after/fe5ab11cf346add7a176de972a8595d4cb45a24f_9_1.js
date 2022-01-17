function (tmxFile,resourcePath) {
        this._internalInit(tmxFile, resourcePath);
        return this.parseXMLFile(this._TMXFileName);
    }
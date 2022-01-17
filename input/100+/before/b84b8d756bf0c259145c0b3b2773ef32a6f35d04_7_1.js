function (tmxString, resourcePath) {
        this._internalInit(null, resourcePath);
        return this.parseXMLString(tmxString);
    }
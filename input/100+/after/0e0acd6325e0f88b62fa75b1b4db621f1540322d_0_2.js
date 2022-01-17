function(newLang) {
    this.currentLocale = newLang;

    if (this._babel[newLang] != null) {
        this._currentLanguage = this._babel[newLang];
    } else {
        this._currentLanguage = {
            'strings': {},
            'labels': {},
            'titles': {}
        };
    }
    if (typeof this._currentLanguage.strings !== "object") {
        this._currentLanguage.strings = {};
    }
    if (typeof this._currentLanguage.labels !== "object") {
        this._currentLanguage.labels = {};
    }
    if (typeof this._currentLanguage.titles !== "object") {
        this._currentLanguage.titles = {};
    }

    this.translate();
}
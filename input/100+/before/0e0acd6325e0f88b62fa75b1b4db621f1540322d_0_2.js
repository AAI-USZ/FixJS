function(newLang) {
    this.currentLocale = newLang;

    if (this._babel[newLang] != undefined) {
        this._currentLanguage = this._babel[newLang];
    } else {
        this._currentLanguage = {
            'strings': [],
            'labels': [],
            'titles': []
        };
    }
    if (this._currentLanguage.strings == undefined)
        this._currentLanguage.strings = []
    if (this._currentLanguage.labels == undefined)
        this._currentLanguage.labels = []
    if (this._currentLanguage.titles == undefined)
        this._currentLanguage.titles = []

    this.translate();
}
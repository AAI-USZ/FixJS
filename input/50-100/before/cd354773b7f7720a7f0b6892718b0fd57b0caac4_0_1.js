function (text, lang) {
	if (lang) {
		if (lang != this.defaultLang) {
			return this.lang[lang][text];
		} else {
			return text;
		}
	} else {
		if (this.currentLang != this.defaultLang) {
			return this.lang[this.currentLang][text];
		} else {
			return text;
		}
	}
}
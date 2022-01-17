function (text, lang) {
	if (lang) {
		return this.lang[lang][text];
	} else {
		return this.lang[this.currentLang][text];
	}
}
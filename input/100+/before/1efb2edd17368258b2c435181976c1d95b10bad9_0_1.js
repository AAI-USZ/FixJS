function (defLang) {
	this.defaultLang = defLang;
	var langElems = $('[jql]');
	var elemsLength = langElems.length;
	
	while (elemsLength--) {
		var elem = langElems[elemsLength];
		var elemType = elem.tagName;
		if(elemType!='HTML'){
			var langElem = $(elem);
			if (langElem.is("input")) {
				// An input element
				switch (langElem.attr('type')) {
					case 'button':
					case 'submit':
						langElem.data('deftext', langElem.val());
					break;
					case 'password':
					case 'text':
						// Check for a placeholder text value
						var plText = langElem.attr('placeholder');
						if (plText) {
							langElem.data('deftext', plText);
						}
					break;
				}
			} else {
				// Not an input element
				langElem.data('deftext', langElem.html());
			}
		}
	}
	
	// Now that the language system is setup, check
	// if there is a current language and switch to it
	if (localStorage) {
		var lsLang = localStorage.getItem('langJs_currentLang');
		if (lsLang) {
			this.currentLang = lsLang;
			this.change(lsLang);
		} else {
			this.change(this.defaultLang);
		}
	} else {
		this.change(this.defaultLang);
	}
}
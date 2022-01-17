function() {
	if(this._iteration > 3 || this._startLine >= this._goodLines.length) {
		try {
			if(this._hiddenBrowser) Zotero.Browser.deleteHiddenBrowser(me._hiddenBrowser);
		} catch(e) {}
		this._callback(false, "recognizePDF.noMatches");
		return;
	}
	this._iteration++;

	var queryString = "";
	var me = this;
	if(this._DOI || this._ISBNs) {
		var translate = new Zotero.Translate.Search();
		var item = {};
		if(this._DOI) {
			// use CrossRef to look for DOI
			translate.setTranslator("11645bd1-0420-45c1-badb-53fb41eeb753");
			item = {"itemType":"journalArticle", "DOI":this._DOI};
			
		}
		else if(this._ISBNs) {
			// use Open WorldCat to look for ISBN
			translate.setTranslator("c73a4a8c-3ef1-4ec8-8229-7531ee384cc4"); 
			item = {"itemType":"book", "ISBN":this._ISBNs[0]};
		}
		translate.setSearch(item);
		translate.setHandler("itemDone", function(translate, item) {
			me._callback(item);
		});
		translate.setHandler("select", function(translate, items, callback) {
			return me._selectItems(translate, items, callback);
		});
		translate.setHandler("done", function(translate, success) {
			if(!success) me._queryGoogle();
		});
		translate.translate(this._libraryID, false);
		if(this._DOI) delete this._DOI;
		else if(this._ISBNs) delete this.ISBNs;
	} else {
		// take the relevant parts of some lines (exclude hyphenated word)
		var queryStringWords = 0;
		while(queryStringWords < 25 && this._startLine < this._goodLines.length) {
			var words = this._goodLines[this._startLine].split(/\s+/);
			// get rid of first and last words
			words.shift();
			words.pop();
			// make sure there are no long words (probably OCR mistakes)
			var skipLine = false;
			for(var i=0; i<words.length; i++) {
				if(words[i].length > 20) {
					skipLine = true;
					break;
				}
			}
			// add words to query
			if(!skipLine && words.length) {
				queryStringWords += words.length;
				queryString += '"'+words.join(" ")+'" ';
			}
			this._startLine++;
		}
		
		Zotero.debug("RecognizePDF: Query string "+queryString);
		
		// pass query string to Google Scholar and translate
		var url = "http://scholar.google.com/scholar?q="+encodeURIComponent(queryString)+"&hl=en&lr=&btnG=Search";
		if(!this._hiddenBrowser) {
			this._hiddenBrowser = Zotero.Browser.createHiddenBrowser();
			this._hiddenBrowser.docShell.allowImages = false;
		}
		
		var translate = new Zotero.Translate.Web();
		var savedItem = false;
		translate.setTranslator("57a00950-f0d1-4b41-b6ba-44ff0fc30289");
		translate.setHandler("itemDone", function(translate, item) {
			Zotero.Browser.deleteHiddenBrowser(me._hiddenBrowser);
			savedItem = true;
			me._callback(item);
		});
		translate.setHandler("select", function(translate, items, callback) {
			me._selectItems(translate, items, callback);
		});
		translate.setHandler("done", function(translate, success) {
			if(!success || !savedItem) me._queryGoogle();
		});
		translate.setHandler("translators", function(translate, detected) { 
				if(detected.length) {
					translate.translate(me._libraryID, false);
				} else {
					me._queryGoogle();
				}
		});
		
		this._hiddenBrowser.addEventListener("pageshow", function() { me._scrape(translate) }, true);
		
		this._hiddenBrowser.loadURIWithFlags(url,
			Components.interfaces.nsIWebNavigation.LOAD_FLAGS_BYPASS_HISTORY, null, null, null);
	}
}
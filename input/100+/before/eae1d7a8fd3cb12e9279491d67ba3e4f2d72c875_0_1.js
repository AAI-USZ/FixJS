function(file, libraryID, callback, captchaCallback) {
	const MAX_PAGES = 7;
	
	this._libraryID = libraryID;
	this._callback = callback;
	//this._captchaCallback = captchaCallback;
	
	var cacheFile = Zotero.getZoteroDirectory();
	cacheFile.append("recognizePDFcache.txt");
	if(cacheFile.exists()) {
		cacheFile.remove(false);
	}
	
	var proc = Components.classes["@mozilla.org/process/util;1"].
			createInstance(Components.interfaces.nsIProcess);
	var exec = Zotero.getZoteroDirectory();
	exec.append(Zotero.Fulltext.pdfConverterFileName);
	proc.init(exec);
	
	var args = ['-enc', 'UTF-8', '-nopgbrk', '-layout', '-l', MAX_PAGES];
	args.push(file.path, cacheFile.path);
	
	Zotero.debug('Running pdftotext '+args.join(" "));
	try {
		if (!Zotero.isFx36) {
			proc.runw(true, args, args.length);
		}
		else {
			proc.run(true, args, args.length);
		}
	}
	catch (e) {
		Zotero.debug("Error running pdftotext", 1);
		Zotero.debug(e, 1);
	}
	
	if(!cacheFile.exists()) {
		this._callback(false, "recognizePDF.couldNotRead");
		return;
	}
	
	var inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"]
		.createInstance(Components.interfaces.nsIFileInputStream);
	inputStream.init(cacheFile, 0x01, 0664, 0);
	var intlStream = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
		.createInstance(Components.interfaces.nsIConverterInputStream);
	intlStream.init(inputStream, "UTF-8", 65535,
		Components.interfaces.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
	intlStream.QueryInterface(Components.interfaces.nsIUnicharLineInputStream);
	
	// get the lines in this sample
	var lines = [],
		cleanedLines = [],
		cleanedLineLengths = [],
		str = {};
	while(intlStream.readLine(str)) {
		var line = str.value.trim();
		if(line) lines.push(line);
	}
	
	inputStream.close();
	cacheFile.remove(false);
	
	// look for DOI - Use only first 80 lines to avoid catching article references
	var allText = lines.join("\n");
	Zotero.debug(allText);
	var m = Zotero.Utilities.cleanDOI(allText.slice(0,80));
	if(m) {
		this._DOI = m[0];
	}
	
	var isbns = this._findISBNs(allText);
	if(isbns.length > 0) {
		this._ISBNs = isbns;
		Zotero.debug("Found ISBNs: " + isbns);
	}
	
	// Use only first column from multi-column lines
	const lineRe = /^\s*([^\s]+(?: [^\s]+)+)/;
	for(var i=0; i<lines.length; i++) {
		var m = lineRe.exec(lines[i]);
		if(m) {
			cleanedLines.push(m[1]);
			cleanedLineLengths.push(m[1].length);
		}
	}
	
	// get (not quite) median length
	var lineLengthsLength = cleanedLineLengths.length;
	if(lineLengthsLength < 20
			|| cleanedLines[0] === "This is a digital copy of a book that was preserved for generations on library shelves before it was carefully scanned by Google as part of a project") {
		this._callback(false, "recognizePDF.noOCR");
	} else {		
		var sortedLengths = cleanedLineLengths.sort();
		var medianLength = sortedLengths[Math.floor(lineLengthsLength/2)];
		
		// pick lines within 4 chars of the median (this is completely arbitrary)
		this._goodLines = [];
		var uBound = medianLength + 4;
		var lBound = medianLength - 4;
		for (var i=0; i<lineLengthsLength; i++) {
			if(cleanedLineLengths[i] > lBound && cleanedLineLengths[i] < uBound) {
				// Strip quotation marks so they don't mess up search query quoting
				var line = cleanedLines[i].replace('"', '');
				this._goodLines.push(line);
			}
		}
		
		this._startLine = this._iteration = 0;
		this._queryGoogle();
	}
}
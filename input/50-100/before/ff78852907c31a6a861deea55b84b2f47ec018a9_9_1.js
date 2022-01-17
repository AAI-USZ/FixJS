function parseParamText(tagText) {
	var pname, pdesc, poptional, pdefault;
	
	// like: pname, pname pdesc, or name - pdesc
	tagText.match(/^(\[[^\]]+\]|\S+)((?:\s*\-\s*|\s+)(\S[\s\S]*))?$/);
	pname = RegExp.$1;
	pdesc = RegExp.$3;

	if ( /^\[\s*(.+?)\s*\]$/.test(pname) ) {
		pname = RegExp.$1;
		poptional = true;
		
		if ( /^(.+?)\s*=\s*(.+)$/.test(pname) ) {
			pname = RegExp.$1;
			pdefault = RegExp.$2;
		}
	}
	return [pname, pdesc, poptional, pdefault];
}
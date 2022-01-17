function(obj, ref, fixed) {
	var x = 0;
	var y = 0;
	var cur = obj.parentNode;
	var limit = ref || obj.ownerDocument.documentElement;
	var fix = false;
	while (1) {
		/* opera debil obcas nastavi scrollTop = offsetTop, aniz by bylo odscrollovano */
		if (JAK.Browser.client == "opera" && cur.parentNode && JAK.DOM.getStyle(cur,"display") != "block") { 
			cur = cur.parentNode;
			continue; 
		}
		
		/* a taky stara opera (<9.5) pocita scrollTop jak pro <body>, tak pro <html> - takze <body> preskocime */
		if (JAK.Browser.client == "opera" && JAK.Browser.version < 9.5 && cur == document.body) { 
			cur = cur.parentNode;
			continue; 
		}
		
		if (fixed && JAK.DOM.getStyle(cur, "position") == "fixed") { fix = true; }
		
		if (!fix) {
			x += cur.scrollLeft;
			y += cur.scrollTop;
		}
		
		if (cur == limit) { break; }
		cur = cur.parentNode;
		if (!cur) { break; }
	}
	return {x:x,y:y};
}
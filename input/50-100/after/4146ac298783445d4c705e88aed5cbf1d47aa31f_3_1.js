function(b) {
		var a = this;
		
		//compareDocumentPosition from http://ejohn.org/blog/comparing-document-position/
		return a.contains ?
				(a != b && a.contains(b) && 16) +
				(a != b && b.contains(a) && 8) +
				(a["sourceIndex"] >= 0 && b["sourceIndex"] >= 0 ?
					(a["sourceIndex"] < b["sourceIndex"] && 4) +
					(a["sourceIndex"] > b["sourceIndex"] && 2) :
				1) +
			0 : 0;
	}
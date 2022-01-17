function updateScriptureCitation(element, editItemSelector)
	{
		var bookName = getBookName(mainOutline.head.ScriptureRange);
		var indexExited = getIndexOfOwningEditItem(element, editItemSelector);
		//alert(indexExited + contentExited)
		applyCitationMarkupForItemToViews(mainOutline.body.concepts, bookName, indexExited, mainOutline.head.ScriptureRange);
		refreshScriptureTagging();		
	}
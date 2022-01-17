function applyCitationMarkup(outline, publishContentToView)
	{
		var scriptureRange = outline.head.ScriptureRange;
		var bookName1 = getBookName(scriptureRange);
		// first establish context of chiasm
		if (bookName1 == null)
		{
			return;
		}
		// next go through each of the items, and identify the verses
		for (i = 0; i < outline.body.concepts.length; i++)
		{
			applyCitationMarkupForItemToViews(outline.body.concepts, bookName1, i, scriptureRange, publishContentToView);
		}
	}
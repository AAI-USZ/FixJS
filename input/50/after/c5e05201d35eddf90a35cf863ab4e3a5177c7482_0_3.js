function publishOutlineToReadOnlyViews()
	{
		JSONToPreviewPanel();
		applyCitationMarkup(mainOutline, publishContentToChiasmView);
		refreshScriptureTagging();		
	}
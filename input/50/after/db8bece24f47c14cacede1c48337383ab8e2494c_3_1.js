function publishContentToChiasmView(concepts, iconcept, newContent)
	{
		var basicViewElementId = getBasicViewConceptId(iconcept, concepts.length);
		updateViewsChiasmContent(basicViewElementId + " .conceptContent", newContent);
	}
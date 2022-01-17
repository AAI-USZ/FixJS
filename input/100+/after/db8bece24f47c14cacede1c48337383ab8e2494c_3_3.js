function updateViewsForEditedItem(textarea)
	{
		var newValue = $(textarea).val();
		var indexEditItem = getIndexOfOwningEditItem(textarea, ".chiasmEditItem");
		var count = mainOutline.body.concepts.length;
		var iconcept = indexAABEditBoxesToIndexConcept(indexEditItem, count);
		if (mainOutline.body.concepts[iconcept].content != newValue)
		{
			//alert(textarea.id + ":" + newValue + ": " + indexEditItem + "->" + iconcept + ": " + mainOutline.body.concepts[iconcept].content)
			mainOutline.body.concepts[iconcept].content = newValue;
			var chiasmElementId = getBasicViewConceptId(iconcept, count);
			updateViewsChiasmContent(chiasmElementId + " .conceptContent", newValue);
		}
		FitToContent(textarea.id,'','100');
	}
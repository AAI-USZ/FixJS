function importFromTextBoxToCurrentChiasm(textBoxId)
	{
		var fStripCounting = $("#stripCounting").attr("checked");
		var abaArray = trimChiasm(textBoxId, fStripCounting);
		loadABAListToCurrentChiasm(abaArray);
		//alert("import" + mainOutline.body.concepts.length);
		LoadAllViewsFromCurrentObj(createdEditBoxesForConcepts);
	}
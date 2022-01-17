function updateHistory(sectionId, contentId, title){
		var dataToSave = {
			href : contentId,
			section : sectionId
		};

		history.pushState(dataToSave, dataToSave.section);
	}
function updateHistory(sectionId, contentId, title){
		var dataToSave = {
			href : contentId,
			section : sectionId,
			title : title
		};

		history.pushState(dataToSave, dataToSave.section, dataToSave.title);
	}
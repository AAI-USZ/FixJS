function () {
		var jsonData;
	   
		try {
			jsonData = JSON.parse(newReferenceInput.val());
		} catch (e) {
			alert("Error: Not valid JSON");
			return;
		}

		CSLEDIT.exampleCitations.addReference(jsonData, citation);
		updateReferenceList();
		newReferenceInput.val("");
	}
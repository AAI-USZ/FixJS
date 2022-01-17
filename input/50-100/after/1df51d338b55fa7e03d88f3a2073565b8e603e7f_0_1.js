function () {
		var jsonData,
			referenceList;
	   
		try {
			jsonData = JSON.parse(newReferenceInput.val());
		} catch (e) {
			alert("Error: Not valid JSON");
			return;
		}

		// will accept individual references or a list
		referenceList = [].concat(jsonData);
		$.each(referenceList, function (i, reference) {
			CSLEDIT.exampleCitations.addReference(reference, citation);
		});

		updateReferenceList();
		newReferenceInput.val("");
	}
function serializeConcepts()
	{
		var concepts = [];
		var positionList = new Array();
		getConceptPositions(positionList, -1);
		for (var i=0; i < positionList.length; i++) {
		  	concepts.push(positionList[i].concept);
		};
		return concepts;
	}
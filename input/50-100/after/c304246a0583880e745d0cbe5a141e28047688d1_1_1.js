function updateWorksheet(oldTitle, newTitle, cells, labelsRequired){
	var URL;
	
	for (var key in graphCollection.worksheets){
		if (graphCollection.worksheets[key].title == oldTitle)
			URL = graphCollection.worksheets[key].URL;
	}
	graphCollection.removeWorksheet(oldTitle);
	addWorksheet(newTitle, cells, labelsRequired);
	exampleSpreadsheets[exampleSpreadsheets.length-1].worksheets[0].URL = URL;
	constructVis();
}
function updateWorksheet(oldTitle, newTitle, cells){
	var URL;
	
	for (var key in graphCollection.worksheets){
		if (graphCollection.worksheets[key].title == oldTitle)
			URL = graphCollection.worksheets[key].URL;
	}
	graphCollection.removeWorksheet(oldTitle);
	addWorksheet(newTitle, cells);
	exampleSpreadsheets[exampleSpreadsheets.length-1].worksheets[0].URL = URL;
	constructVis();
}
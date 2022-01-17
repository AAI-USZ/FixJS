function(){
	var title = $('#worksheetTitle').val();
	var rawText = $('#worksheetText').val();
	var cells = [];
	
	//parses a table with cols separated by tabs or commas 
	rawText.split('\n').forEach(function(line){
		lineArray = [];
		line.split('\t').forEach(function(tabChunk){
			commaSep = tabChunk.split(",");
			for (var i=0; i<commaSep.length; i++)
				lineArray.push($.trim(commaSep[i]));
		});
		
		cells.push(lineArray);
	});
	if (validateWorksheetForm(title, cells, $('#worksheetLabelsRequired').is(':checked'))){
		if (worksheetNew)
			addWorksheet(title, cells, $('#worksheetLabelsRequired').is(':checked'));
		else
			updateWorksheet(worksheetToEdit,title,cells, $('#worksheetLabelsRequired').is(':checked'));
		$('#worksheetMenu').slideUp();
	}
	
}
function(){
	if (confirm("Are you sure you want to delete "+worksheetToEdit+"?")) { 
		hideMenus();
		graphCollection.removeWorksheet(worksheetToEdit);
		constructVis();
		$('#worksheetMenu').slideUp();
	}
	
	
}
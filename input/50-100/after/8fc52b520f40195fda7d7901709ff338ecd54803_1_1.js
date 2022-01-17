function saveSubject(alertSave) {
	
	g_curSubject.lname = $("#lname").val();
	g_curSubject.fname = $("#fname").val();

	if($("#radio-male").attr('checked')) {
		g_curSubject.gender = "M";
	} else if($("#radio-female").attr('checked')) {
		g_curSubject.gender = "F";
	}
	
	saveCurSubject();
	setSubjSelect();
	
	if(alertSave) alert("Save Completed.");
	
}
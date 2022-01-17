function saveSubject(alertSave) {
	
	g_curSubject.lname = $("#lname").val();
	g_curSubject.fname = $("#fname").val();
	g_curSubject.gender = $('input:radio[name=gender]:checked').val();
	
	saveCurSubject();
	setSubjSelect();
	
	if(alertSave) alert("Save Completed.");
	
}
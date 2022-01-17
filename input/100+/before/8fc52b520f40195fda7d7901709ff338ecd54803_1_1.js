function setSubjectVals() {			
	
	if(g_curSubject == null) { //no current subject defined.
		
		if(g_curIncident.subjects) {//start with first subject.
			
			g_curSubject = g_curIncident.subjects[0];
			
		} else { //This is the very first subject for a new event.
			g_curSubject = new Object();
			g_curSubject.civId = uniqid(); //new subject ID:
			g_curIncident.subjects = new Array();
			g_curIncident.subjects.push(g_curSubject);
		}
			
	}

	$("#lname").val(g_curSubject.lname);
	$("#fname").val(g_curSubject.fname);
	
	var gender = g_curSubject.gender;
	if(gender == "M") {
		$("#radio-male").attr('checked', true).checkboxradio("refresh");
	} else if(gender == "F") {
		$("#radio-female").attr('checked', true).checkboxradio("refresh");
	} else {
		$("#radio-male").attr('checked', false).checkboxradio("refresh");	
		$("#radio-female").attr('checked', false).checkboxradio("refresh");
	}
	
}
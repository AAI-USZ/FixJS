function refreshCourses() {
	// Iterate over the course slots and refresh each one
	for(var i = 1; i <= $("#courseCount").val(); i++) {
		// Only update if it's not the default value
		if($("#courses" + i).val() != "XXXX-XXX-XX") {
			getCourseOptions(document.getElementById("courses" + i));
		}
	}
}
function refreshCourses() {
	// Iterate over the course slots and refresh each one
	for(var i = 1; i <= $("#courseCount").val(); i++) {
		// Only update if it's not the default value
		if($("#courses" + i).val() != COURSE_PLACEHOLDER) {
			getCourseOptions(document.getElementById("courses" + i));
		}
	}
}
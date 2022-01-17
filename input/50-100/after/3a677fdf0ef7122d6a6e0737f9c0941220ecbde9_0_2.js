function cancelCourseAssignment(el, course, user) {

	parameters = {course_id:course, users_login:user, ajax:'cancel', method: 'get'};

	var url    = window.location.toString();

	ajaxRequest(el, url, parameters, onCourseAssignment);			

}
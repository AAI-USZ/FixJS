function addCourse() {
	// First things first. Grab the schedulCourses div and the last row
	scheduleCourses = document.getElementById('scheduleCourses');
	lastRow = document.getElementById('courseRow' + scheduleCourses.children.length);

	// Build a new course
	courseNum = document.getElementsByClassName('course').length + 1;

	newCourse = document.createElement("div");
	newCourse.className = "course";
	
	newHeader = document.createElement("h3");
	newHeader.innerHTML = "Course " + courseNum;
	newCourse.appendChild(newHeader);
	
	newInput = document.createElement("input");
	newInput.setAttribute("id", 'courses' + courseNum);
	newInput.setAttribute("type", 'text');
	newInput.setAttribute("name", 'courses' + courseNum);
	newInput.setAttribute("maxlength", '13');
	newInput.setAttribute('onFocus', 'courseOnFocus(this);');
	newInput.setAttribute('onBlur', 'getCourseOptions(this);');
	newInput.setAttribute('value', 'XXXX-XXX-XX');
	newCourse.appendChild(newInput);
	
	newOptions = document.createElement("div");
	newOptions.className = "courseOpts";
	newCourse.appendChild(newOptions);

	// If there are less than 4 children in this row, we can just add
	if(lastRow.children.length < 4) {
		lastRow.appendChild(newCourse);
	} else {
		// Well shit. We've gotta add a new row.
		newRow = document.createElement("div");
		newRow.id = 'courseRow' + (scheduleCourses.children.length + 1);
		newRow.className = "courseRow";
		newRow.appendChild(newCourse);
		scheduleCourses.appendChild(newRow);
	}

	// Increment our hidden field of number of courses
	document.getElementById("courseCount").value = courseNum;
}
function toggleVisible(e, element) {
    //obtain the program id
	var pos = element.indexOf('-');
	var programid = element.substr(pos + 1);

    //if on the dashboard, handle the complete button toggle
	var completebuttonname;
	if (programid == 'na') {
		completebuttonname = 'noncurriculacompletedbutton';
	} else {
		completebuttonname = 'curriculum' + programid + 'completedbutton';
	}

    //try to fetch the complete button
    var completebuttons = document.getElementsByName(completebuttonname);
    var completebutton = null;
    if (completebuttons.length >= 0) {
        completebutton = completebuttons[0];
    }

    //standard show/hide button
    element = document.getElementById(element);
    var button = e.target ? e.target : e.srcElement;
    var regexp = new RegExp(' ?hide');
    if (element.className.match(regexp)) {
	    element.className = element.className.replace(regexp, '');

	    if (completebutton != null) {
            //show the complete toggle button
	        completebutton.className = '';
	    }

	    button.value = button.moodle.hideLabel;
    } else {
        element.className += ' hide';

        if (completebutton != null) {
            //hide the complete toggle button
            completebutton.className = 'hide';
        }

        button.value = button.moodle.showLabel;
    }

    return false;
}
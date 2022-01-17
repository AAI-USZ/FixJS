function toggleVisible(e, element) {
    element = document.getElementById(element);
    var button = e.target ? e.target : e.srcElement;
    var regexp = new RegExp(' ?hide');
    if (element.className.match(regexp)) {
	element.className = element.className.replace(regexp, '');
	button.value = button.moodle.hideLabel;
    } else {
        element.className += ' hide';
	button.value = button.moodle.showLabel;
    }

    return false;
}
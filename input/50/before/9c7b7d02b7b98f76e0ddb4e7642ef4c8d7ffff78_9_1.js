function changeClass() {
	var f = document.forms[0];

	f.classes.value = getSelectValue(f, 'classlist');
}
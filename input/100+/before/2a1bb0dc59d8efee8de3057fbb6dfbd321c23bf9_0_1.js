function hide_show(id) {
	(document.getElementById(id).style.display == 'none') ?
		document.getElementById(id).style.display = 'block' :
		document.getElementById(id).style.display = 'none';
}
function save_current_scripts(){
	show_workspace();
	$('#accordion')[0].scrollIntoView();
	localStorage['__current_scripts'] = JSON.stringify(scripts_as_object());
}
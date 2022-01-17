function checkstorage() {
	if(storage.get('abra_check_input') == undefined)
		storage.set('abra_check_input', false);
	if(storage.get('abra_check') == undefined)
		storage.set('abra_check', false);
	if(storage.get('abra_old_hotkey') == undefined)
		storage.set('abra_old_hotkey', "Ctrl+Shift+A");
	if(storage.get('abra_hotkey') == undefined)
		storage.set('abra_hotkey', "Ctrl+Shift+A");
	if(storage.get('abra_check_selected') == undefined)
		storage.set('abra_check_selected', "true");
}
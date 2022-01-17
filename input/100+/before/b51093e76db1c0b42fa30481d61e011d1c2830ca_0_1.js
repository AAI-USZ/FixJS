function(){
	// save hot key for all edit screens
	if($('button[id*="submit"]').length > 0){
		$(document).bind('keydown', config.AdminHotKeys.hk_save, savePage);
		function savePage(e){ $('button[id*="submit"]').trigger("click"); };
	}
	// add hot key for "add new"
	if($('a[href*="add"]').length > 0){
		$(document).bind('keydown', config.AdminHotKeys.hk_addnew, addNew);
		function addNew(e){ $('a[href*="add"] button').trigger("click"); };
	}

}
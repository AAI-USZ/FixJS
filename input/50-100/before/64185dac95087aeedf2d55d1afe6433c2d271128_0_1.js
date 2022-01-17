function removeButtonCheck() {
    var rows = $('#smart-playlist-form');
	
    if (rows.find('select[name^="sp_criteria_field"]:enabled').length == 1) {
        rows.find('a[id="criteria_remove_0"]').attr('disabled', 'disabled');
        rows.find('a[id="criteria_remove_0"]').hide();
    } else {
        rows.find('a[id="criteria_remove_0"]').removeAttr('disabled');
        rows.find('a[id="criteria_remove_0"]').show(); 
    }
}
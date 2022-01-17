function(doc, tab, length) {
	// add checked profiles to list of recipients
	var rec_list = [];
	for(var i = 1; i <= length; i++) {
		var input = $($td(tab, i, 0)).find('input');
		if(input.is(':checked')) {
			rec_list.push(input.attr('value'));
		}
	}
	doc.recipient_list = rec_list.join('\n');
	//console.log(doc.recipient_list);
	cur_frm.rec_dialog.hide();
	cur_frm.refresh_fields();
}
function(doc) {
	cur_frm.toggle_display(['new_password', 'send_welcome_mail'], doc.__islocal);
	cur_frm.toggle_reqd('new_password', doc.__islocal);
	
	cur_frm.set_intro(doc.enabled ? '' : 'This user is diabled.');

	if(doc.__islocal) {
		cur_frm.toggle_display(['sb1', 'sb2', 'sb3'], false);
	} else {
		cur_frm.cscript.enabled(doc);
		cur_frm.roles_editor.show(doc.name);
		if(doc.enabled)
			cur_frm.show_update_password();
	}
}
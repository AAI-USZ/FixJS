function(doc) {
	cur_frm.toggle_reqd('new_password', doc.__islocal);

	if(doc.__islocal) {
		cur_frm.toggle_display(['sb1', 'sb2', 'sb3'], false);
	} else {
		cur_frm.cscript.enabled(doc);
		cur_frm.roles_editor.show(doc.name)
	}
}
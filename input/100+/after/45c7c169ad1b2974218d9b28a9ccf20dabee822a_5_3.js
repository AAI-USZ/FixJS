function() {
	var me = this;
	if(me.fields_dict['amended_from']) {
		if (me.doc.amended_from) {
			unhide_field('amended_from'); unhide_field('amendment_date');
		} else {
			hide_field('amended_from'); hide_field('amendment_date');
		}
	}

	if(me.fields_dict['trash_reason']) {
		if(me.doc.trash_reason && me.doc.docstatus == 2) {
			unhide_field('trash_reason');
		} else {
			hide_field('trash_reason');
		}
	}

	if(me.meta.autoname && me.meta.autoname.substr(0,6)=='field:' && !me.doc.__islocal) {
		var fn = me.meta.autoname.substr(6);
		cur_frm.toggle_display(fn, false);
	}
}
function() {
		if(cur_frm.meta.hide_toolbar) {
			// hide label with toolbar
			return;
		}
		
		var labinfo = {
			0: ['Saved', 'label-success'],
			1: ['Submitted', 'label-info'],
			2: ['Cancelled', 'label-important']
		}[cint(cur_frm.doc.docstatus)];
		
		if(labinfo[0]=='Saved' && cur_frm.meta.is_submittable) {
			labinfo[0]='Saved, to Submit';
		}
		
		if(cur_frm.doc.__unsaved || cur_frm.doc.__islocal) {
			labinfo[0] = 'Not Saved';
			labinfo[1] = 'label-warning'
		}

		this.set_label(labinfo);
		
		// show update button if unsaved
		if(cur_frm.doc.__unsaved && cint(cur_frm.doc.docstatus)==1 && this.appframe.buttons['Update']) {
			this.appframe.buttons['Update'].toggle(true);
		}
		
	}
function() {
		// clear
		
		if(cur_frm.meta.hide_toolbar) {
			$('.appframe-toolbar').toggle(false);
			return;
		}
		
		this.appframe.clear_buttons();
		var p = cur_frm.get_doc_perms();

		// Edit
		if(cur_frm.meta.read_only_onload && !cur_frm.doc.__islocal) {
			if(!cur_frm.editable)
				this.appframe.add_button('Edit', function() { 
					cur_frm.edit_doc();
				},'icon-pencil');
			else
				this.appframe.add_button('Print View', function() { 
					cur_frm.is_editable[cur_frm.docname] = 0;				
					cur_frm.refresh(); }, 'icon-print' );	
		}

		var docstatus = cint(cur_frm.doc.docstatus);
		// Save
		if(docstatus==0 && p[WRITE]) {
			this.appframe.add_button('Save', function() { cur_frm.save('Save');}, '');
			this.appframe.buttons['Save'].addClass('btn-info');			
		}
		// Submit
		if(docstatus==0 && p[SUBMIT] && (!cur_frm.doc.__islocal))
			this.appframe.add_button('Submit', function() { cur_frm.savesubmit();}, 'icon-lock');

		// Update after sumit
		if(docstatus==1 && p[SUBMIT]) {
			this.appframe.add_button('Update', function() { cur_frm.saveupdate();}, '');
			if(!cur_frm.doc.__unsaved) this.appframe.buttons['Update'].toggle(false);
		}

		// Cancel
		if(docstatus==1  && p[CANCEL])
			this.appframe.add_button('Cancel', function() { cur_frm.savecancel() }, 'icon-remove');

		// Amend
		if(docstatus==2  && p[AMEND])
			this.appframe.add_button('Amend', function() { cur_frm.amend_doc() }, 'icon-pencil');
			
		// Help
		if(cur_frm.meta.description) {
			this.appframe.add_help_button(wn.markdown('## ' + cur_frm.doctype + '\n\n'
				+ cur_frm.meta.description));
		}

	}
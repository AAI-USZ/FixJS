function(r) {
		me.savingflag = false;
		if(user=='Guest' && !r.exc) {
			// if user is guest, show a message after succesful saving
			$dh(me.page_layout.wrapper);
			$ds(me.saved_wrapper);
			me.saved_wrapper.innerHTML = 
				'<div style="padding: 150px 16px; text-align: center; font-size: 14px;">' 
				+ (cur_frm.message_after_save ? cur_frm.message_after_save : 'Your information has been sent. Thank you!') 
				+ '</div>';
			return; // no refresh
		}
		
		if(!me.meta.istable) {
			me.refresh(r.docname);
		}

		if(call_back){
			call_back(r);
		}
	}
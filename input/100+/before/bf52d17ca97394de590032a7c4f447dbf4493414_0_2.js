function(data) {
		data.fullname = wn.user_info(data.owner).fullname;
		data.avatar = wn.user_info(data.owner).image;
		
		// when
		data.when = dateutil.str_to_user(data.modified).split(' ')[0];
		var diff = dateutil.get_diff(dateutil.get_today(), data.modified.split(' ')[0]);
		if(diff==0) {
			data.when = dateutil.comment_when(data.modified);
		}
		if(diff == 1) {
			data.when = 'Yesterday'
		}
		if(diff == 2) {
			data.when = '2 days ago'
		}
		
		// docstatus
		if(data.docstatus==0 || data.docstatus==null) {
			data.docstatus_icon = 'icon-pencil';
			data.docstatus_title = 'Editable';
		} else if(data.docstatus==1) {
			data.docstatus_icon = 'icon-lock';			
			data.docstatus_title = 'Submitted';
		} else if(data.docstatus==2) {
			data.docstatus_icon = 'icon-remove';			
			data.docstatus_title = 'Cancelled';
		}
		
		// nulls as strings
		for(key in data) {
			if(data[key]==null) {
				data[key]='';
			}
		}
	}
function() {
		var me = wn.pages.users;
		var active_users = $('.user-card:not(.disabled)');
		if(wn.boot.max_users && (active_users.length >= wn.boot.max_users)) {
			msgprint(repl("You already have <b>%(active_users)s</b> active users, \
			which is the maximum number that you are currently allowed to add. <br /><br /> \
			So, to add more users, you can:<br /> \
			1. <b>Upgrade to the unlimited users plan</b>, or<br /> \
			2. <b>Disable one or more of your existing users and try again</b>",
				{active_users: active_users.length}));
			return;
		}
		var d = new wn.widgets.Dialog({
			title: 'Add User',
			width: 400,
			fields: [{
					fieldtype: 'Data', fieldname: 'user', reqd: 1, 
					label: 'Email Id of the user to add'
				}, {
					fieldtype: 'Data', fieldname: 'first_name', reqd: 1, label: 'First Name'
				}, {
					fieldtype: 'Data', fieldname: 'last_name', label: 'Last Name'
				}, {
					fieldtype: 'Data', fieldname: 'password', reqd: 1, label: 'Password'
				}, {
					fieldtype: 'Button', label: 'Add', fieldname: 'add'
				}]
		});
		
		d.make();
		d.fields_dict.add.input.onclick = function() {
			v = d.get_values();
			if(v) {
				d.fields_dict.add.input.set_working();
				$c_page('utilities', 'users', 'add_user', v, function(r,rt) {
					if(r.exc) { msgprint(r.exc); return; }
					else {
						wn.boot.user_info[v.user] = {fullname:v.first_name + ' ' + (v.last_name || '')};
						d.hide();
						me.refresh();
					}
				})
			}
		}
		d.show();		
	}
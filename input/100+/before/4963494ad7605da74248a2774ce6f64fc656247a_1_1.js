function(e) {
				// clicking on yes...
				if(e.index == 0) {
					Cloud.Users.logout(function(e) {
						if(e.success) {
							Ti.App.Properties.removeProperty('token');//.setString("token", ''), 
							Ti.App.Properties.removeProperty('email');//setString("email", ''),
							Ti.App.Properties.removeProperty('name');//setString("name", ''),
							alert('Success: Logged out'),
							loginWin.open();
						} else {
							alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
						}
					});
				} else {
					resultOptionDialog.hide();
				}
			}
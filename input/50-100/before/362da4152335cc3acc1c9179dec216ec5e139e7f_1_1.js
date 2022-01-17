function(e) {
						if(e.success) {
							Ti.App.Properties.setString("token", ''), 
							Ti.App.Properties.setString("email", ''),
							Ti.App.Properties.setString("name", ''),
							alert('Success: Logged out'),
							loginWin.open();
						} else {
							alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
						}
					}
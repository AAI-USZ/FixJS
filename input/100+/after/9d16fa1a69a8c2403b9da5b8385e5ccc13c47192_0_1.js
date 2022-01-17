function(ev) {
				ev.preventDefault();
				var oldPass = $("[name=password]").val();
				var newPass = $("[name=new_password]").val();
				var newPass2 = $("[name=new_password_confirm]").val();
				if(newPass !== newPass2) {
					var msg = "Passwords do not match";
					ts.messages.display(form, msg, true,
						{ selector: "[name=new_password], [name=new_password_confirm]" });
				} else if(newPass.length < 6) {
					ts.messages.display(form, ts.locale.passwordLengthError, true, 
						{ selector: "[name=new_password],[name=new_password_confirm]" });
				} else {
					ts.changePassword(ts.user.name, oldPass, newPass, form);
				}
				return false;
			}
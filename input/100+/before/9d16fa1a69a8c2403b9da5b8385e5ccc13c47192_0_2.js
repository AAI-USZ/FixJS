function(ev) {
				ev.preventDefault();
				var username = $("[name=username]", form).val();
				var password = $("[name=password]", form).val();
				options.redirect = $("[name=redirect]", form).val();
				var passwordConfirm = $("[name=password_confirm]", form).val();
				var validName = ts.isValidSpaceName(username);
				if(validName && password && password === passwordConfirm) { // TODO: check password length?
					ts.register(username, password, ev.target, options);
				} else {
					var msg = validName ? ts.locale.passwordError : ts.locale.charError;
					options.annotate = validName ? "[type=password]" : "[name=username]";
					ts.messages.display(form, msg, true, options);
				}
				return false;
			}
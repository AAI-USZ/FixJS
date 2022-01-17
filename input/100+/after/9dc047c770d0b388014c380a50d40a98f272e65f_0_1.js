function(ev) {
				ev.preventDefault();
				var username = $("[name=username]", form).val();
				var password = $("[name=password]", form).val();
				options.redirect = $("[name=redirect]", form).val();
				var passwordConfirm = $("[name=password_confirm]", form).val();
				var validName = ts.isValidSpaceName(username);
				var validLength = password.length >= 6;
				if(validName && validLength && password &&
						password === passwordConfirm) {
					ts.register(username, password, ev.target, options);
				} else {
					var msg = validName ? (validLength ?
						ts.locale.passwordLengthError :
						ts.locale.passwordError) :
						ts.locale.charError;
					options.annotate = validName ? "[type=password]" : "[name=username]";
					ts.messages.display(form, msg, true, options);
				}
				return false;
			}
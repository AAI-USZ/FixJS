function(r) {
				if (r) {
					Joomla.replaceTokens(r.token)
					if (r.error == false) {
						alert(Joomla.JText._('INSTL_FTP_SETTINGS_CORRECT', 'Settings correct'));
					} else {
						alert(r.message);
					}
				}
				el.set('disabled', '');
			}
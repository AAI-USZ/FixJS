function(xhr) {
				var r = JSON.decode(xhr.responseText);
				if (r) {
					Joomla.replaceTokens(r.token);
					document.id('theDefaultError').setStyle('display','block');
					document.id('theDefaultErrorMessage').set('html', r.message);
				}
				el.set('disabled', '');
				filename.set('disabled', '');
			}
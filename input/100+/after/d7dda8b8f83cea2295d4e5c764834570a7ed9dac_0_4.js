function(el, filename) {
		this.busy = true;
		sample_data_spinner = new Spinner('sample-data-region');
		sample_data_spinner.show(true);
		el = document.id(el);
		filename = document.id(filename);
		var req = new Request.JSON({
			method: 'get',
			url: 'index.php?'+document.id(el.form).toQueryString(),
			data: {'task':'setup.loadSampleData', 'format':'json'},
			onRequest: function() {
				el.set('disabled', 'disabled');
				filename.set('disabled', 'disabled');
				document.id('theDefaultError').setStyle('display','none');
			},
			onSuccess: function(r) {
				if (r) {
					Joomla.replaceTokens(r.token);
					this.sampleDataLoaded = r.data.sampleDataLoaded;
					if (r.error == false) {
						el.set('value', Joomla.JText._('INSTL_SITE_SAMPLE_LOADED', 'Sample Data Installed Successfully.'));
						el.set('onclick','');
						el.set('disabled', 'disabled');
						filename.set('disabled', 'disabled');
						document.id('jform_sample_installed').set('value','1');
					} else {
						document.id('theDefaultError').setStyle('display','block');
						document.id('theDefaultErrorMessage').set('html', r.message);
						el.set('disabled', '');
						filename.set('disabled', '');
					}
				} else {
					document.id('theDefaultError').setStyle('display','block');
					document.id('theDefaultErrorMessage').set('html', response );
					el.set('disabled', 'disabled');
					filename.set('disabled', 'disabled');
				}
				this.busy = false;
				sample_data_spinner.hide(true);
			}.bind(this),
			onFailure: function(xhr) {
				var r = JSON.decode(xhr.responseText);
				if (r) {
					Joomla.replaceTokens(r.token);
					document.id('theDefaultError').setStyle('display','block');
					document.id('theDefaultErrorMessage').set('html', r.message);
				}
				el.set('disabled', '');
				filename.set('disabled', '');
				this.busy = false;
				sample_data_spinner.hide(true);
			}
		}).send();
	}
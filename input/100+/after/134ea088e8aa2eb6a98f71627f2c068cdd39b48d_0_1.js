function() {
    	this.addToggler();
		// Attach the validator
		$$('form.form-validate').each(function(form){ this.attachToForm(form); }, document.formvalidator);

		if (this.view == 'site' && this.sampleDataLoaded) {
			var select = document.id('jform_db_old');
			var button = document.id('theDefault').children[0];
			button.setAttribute('disabled', 'disabled');
			select.setAttribute('disabled', 'disabled');
			button.setAttribute('value', Joomla.JText._('INSTL_SITE_SAMPLE_LOADED', 'Sample Data Installed Successfully.'));
		}
    }
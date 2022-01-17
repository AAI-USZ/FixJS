function () {
		if (this.options.confirm === true) {
			if (!confirm(Joomla.JText._('PLG_FORM_AUTOFILL_DO_UPDATE'))) {
				return;
			}
		}
		Fabrik.loader.start('form_' + this.options.formid, Joomla.JText._('PLG_FORM_AUTOFILL_SEARCHING'));
		
		var v = this.element.getValue();
		var formid = this.options.formid;
		var observe = this.options.observe;
		
		var myAjax = new Request.JSON({ 
			'data': {
				'option': 'com_fabrik',
				'format': 'raw',
				'task': 'plugin.pluginAjax',
				'plugin': 'autofill',
				'method': 'ajax_getAutoFill',
				'g': 'form',
				'v': v, 
				'formid': formid,
				'observe': observe,
				'cnn': this.options.cnn,
				'table': this.options.table,
				'map': this.options.map
			},
			onCancel: function () {
				Fabrik.loader.stop('form_' + this.options.formid);
			}.bind(this),
			
			onError: function (text, error) {
				Fabrik.loader.stop('form_' + this.options.formid);
				fconsole(text + ' ' + error);
			}.bind(this),
			onSuccess: function (json, responseText) {
				Fabrik.loader.stop('form_' + this.options.formid);
				this.updateForm(json);
			}.bind(this)
		}).send();
	}
function (v)
	{
		var data = {
				'option': 'com_fabrik',
				'format': 'raw',
				'task': 'plugin.pluginAjax',
				'plugin': 'databasejoin',
				'method': 'ajax_getOptions',
				'element_id': this.options.id
			};
		// $$$ hugh - don't think we need to fetch values if auto-complete
		// and v is empty, otherwise we'll just fetch every row in the target table,
		// and do thing with it in onComplete?
		if (this.options.display_type === 'auto-complete' && v === '') {
			return;
		}
		if (v) {
			data[this.strElement + '_raw'] = v;
			//joined elements strElement isnt right so use fullName as well
			data[this.options.fullName + '_raw'] = v;
		}
		new Request.JSON({url: '',
			method: 'post', 
			'data': data,
			onSuccess: function (json) {
				var existingValues = this.getOptionValues();
				//if duplicating an element in a repeat group when its auto-complete we dont want to update its value
				if (this.options.display_type === 'auto-complete' && v === '' && existingValues.length === 0) {
					return;
				}
				json.each(function (o) {
					if (!existingValues.contains(o.value)) {
						if (this.activePopUp) {
							this.options.value = o.value;
						}
						this.addOption(o.value, o.text);
						this.element.fireEvent('change', new Event.Mock(this.element, 'change'));
						this.element.fireEvent('blur', new Event.Mock(this.element, 'blur'));
					}
				}.bind(this));
				this.activePopUp = false;
			}.bind(this)
		}).post();
	}
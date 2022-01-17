function (json) {
		var repeatNum = this.element.getRepeatNum();
		json = $H(json);
		if (json.length === 0) {
			alert(Joomla.JText._('PLG_FORM_AUTOFILL_NORECORDS_FOUND'));
		}
		
		json.each(function (val, key) {
			var k2 = key.substr(key.length - 4, 4);
			if (k2 === '_raw') {
				key = key.replace('_raw', '');
				if (!this.tryUpdate(key, val)) {
					if (repeatNum) {
						key += '_' + repeatNum;
						if (!this.tryUpdate(key, val)) {
							// See if the user has used simply the full element name rather than the full element name with
							// the join string
							key = 'join___' + this.element.options.joinid + '___' + key;
							this.tryUpdate(key, val);
						}
					}
				}
			}
		}.bind(this));
		if (this.options.editOrig === true) {
			this.form.getForm().getElement('input[name=rowid]').value = json.__pk_val;
		}
	}
function()
	{
		var values = this.bits.values();
		if (this.options.get('jsonInputValue')) {
			if (!this.current_input.blank()) {
				this.current_input.split(/,/).each(function(value) {
					value = value.strip();
					values.push({caption: value, value: value, newValue: true});
				}.bind(this)); //bindAsEventListener(this)) -- we are not listening
			}
			this.element.value = Object.toJSON(values);
		} else {
	 		if (this.options.get('encodeEntities')) {
				// entitizeHTML / unentitizeHTML needs to be called around the unescapeHTML() call in order to preserve any braces
				values = values.map(function(e) { return e.toString().entitizeHTML().unescapeHTML().unentitizeHTML(); });
			}
			this.element.value = values.join(this.options.get('separator'));			

			if (!this.current_input.blank()) {
				this.element.value += (this.element.value.blank() ? "" : this.options.get('separator')) + this.current_input;
			}
			
		}
		
		return this;
	}
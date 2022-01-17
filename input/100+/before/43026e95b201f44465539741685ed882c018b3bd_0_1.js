function() {
		var value = this.current.retrieve('textboxlist:auto:value');
		var box = this.textboxlist.create('box', value.slice(0, 3));
		if (box) {
			box.autoValue = value;
			if (this.index != null) {
				this.index.push(value);
			}
			this.currentInput.setValue([null, '', null]);
			box.inject(document.id(this.currentInput), 'before');
		}
		this.blur();
		return this;
	}
function ( data ) {
		
		this._settingData = true;
		
		PB.each(data, this.set, this);
		
		this._settingData = false;
		
		// Emit any change
		this.emit('change', this);
		
		return this;
	}
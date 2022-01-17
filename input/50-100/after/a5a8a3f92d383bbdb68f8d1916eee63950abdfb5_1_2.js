function ( key, value ) {
		
		// Store previous value
		var previousValue = this.data[key];
		
		// Do nothing when value is not changed
		if( previousValue === value ) {
			
			return this;
		}
		
		// Execute data 'set-binding'
	/*	if( this.properties && this.properties[key] && this.properties[key].set ) {
			
			value = this.properties[key].set.call( this, value, this.data[key] );
		}*/
		
		this.data[key] = value;
		
		// Only trigger for single change of property
		if( !this._settingData ) {
			
			// Emit any change
			this.emit('change', this);
		}

		// Emit specific event listening
		// will trigger like change:name
		this.emit('change:'+key, this, key);
		
		return this;
	}
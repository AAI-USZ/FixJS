function ( key, value ) {

		var previousValue = this.data[key];

		if( previousValue === value ) {

			return this;
		}

	/*	if( this.properties && this.properties[key] && this.properties[key].set ) {

			value = this.properties[key].set.call( this, value, this.data[key] );
		}*/

		this.data[key] = value;

		if( !this._settingData ) {

			this.emit('change', this);
		}

		this.emit('change:'+key, this, key);

		return this;
	}
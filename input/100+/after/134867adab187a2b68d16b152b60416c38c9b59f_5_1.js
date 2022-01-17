function( disable ) {
		if ( !this.stateChangeable ) { // state is not supposed to change, no need to do anything
			return true;
		}
		if( typeof disable == 'undefined' ) {
			disable = true;
		}
		if( this.isDisabled() == disable ) {
			return true; // no point in disabling/enabling if this is the current state
		}
		var cls = this.UI_CLASS + '-disabled';

		if( disable ) {
			if( this.beforeDisable !== null && this.beforeDisable() === false ) { // callback
				return false; // cancel
			}
			this._elem.addClass( cls );
		} else {
			if( this.beforeEnable !== null && this.beforeEnable() === false ) { // callback
				return false; // cancel
			}
			this._elem.removeClass( cls );
		}

		return true;
	}
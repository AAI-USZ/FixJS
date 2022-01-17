function( disable ) {
		if( typeof disable == 'undefined' ) {
			disable = true;
		}
		if( this.isDisabled() == disable ) {
			// no point in disabling/enabling if this is the current state
			return false;
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
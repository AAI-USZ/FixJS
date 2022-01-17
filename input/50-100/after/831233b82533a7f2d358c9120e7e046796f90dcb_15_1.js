function() {
			if ( typeof this.baseobjectSelector !== 'undefined' ) {
				if( jQuery( this.baseobjectSelector ).length > 0 ) {
					return jQuery( this.baseobjectSelector );
				} else {
					return false;
				}
			} else {
				if ( typeof Aloha.activeEditable === 'undefined' || Aloha.activeEditable == null ) {
					return false;
				} else {
					return Aloha.activeEditable.obj;
				}
			}
		}
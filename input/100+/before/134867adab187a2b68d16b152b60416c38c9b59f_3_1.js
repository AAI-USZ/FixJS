function( disable ) {
		if( this.isDisabled() == disable ) {
			return false;
		}
		var text = this.getContent();
		var oldElem = this._elem;

		if( disable ) {
			// create a disabled label instead of a link
			window.wikibase.ui.Toolbar.Label.prototype._initElem.call( this, text );
		}
		else {
			this._initElem( text );
		}

		// replace old element with new one within dom
		oldElem.replaceWith( this._elem );

		// call prototypes disable function:
		return window.wikibase.ui.Toolbar.Label.prototype.setDisabled.call( this, disable );
	}
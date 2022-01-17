function( editableValue ) {
		this._editableValue = editableValue;

		window.wikibase.ui.Toolbar.Group.prototype._init.call( this );
	}
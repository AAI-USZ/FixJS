function( apiAction ) {
		var params = window.wikibase.ui.PropertyEditTool.EditableValue.prototype.getApiCallParams.call( this, apiAction );
		return $.extend( params, {
			action: "wbsetlanguageattribute",
			label: this.getValue().toString()
		} );
	}
function( apiAction ) {
		var params = window.wikibase.ui.PropertyEditTool.EditableValue.prototype.getApiCallParams.call( this, apiAction );
		if( mw.config.get( 'wbItemId' ) === null ) { // new item should be created
			var newItem ='{"descriptions":{"' + mw.config.get( 'wgUserLanguage' ) + '":"' + this.getValue().toString() + '"}}';
			return $.extend( params, {
				action: "wbsetitem",
				data: newItem
			} );
		} else {
			return $.extend( params, {
				action: 'wbsetlanguageattribute',
				description: this.getValue().toString()
			} );
		}
	}
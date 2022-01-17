function( apiAction ) {
		var params = window.wikibase.ui.PropertyEditTool.EditableValue.prototype.getApiCallParams.call( this, apiAction );
		params = $.extend( params, {
			action: 'wblinksite',
			linksite: this.siteIdInterface.getSelectedSite().getGlobalSiteId(),
			linktitle: this.getValue()[1]
		} );
		params.link = ( apiAction === this.API_ACTION.REMOVE || apiAction === this.API_ACTION.SAVE_TO_REMOVE ) ? 'remove' : 'set';
		delete( params.item ); // ? danwe: why is there an 'item' AND a 'link' param here?
		delete( params.language );

		return params;
	}
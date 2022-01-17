function( apiAction ) {
		var params = window.wikibase.ui.PropertyEditTool.EditableValue.prototype.getApiCallParams.call( this, apiAction );
		params = $.extend( params, {
			action: 'wbsetsitelink',
			linksite: this.siteIdInterface.getSelectedSite().getGlobalSiteId(),
			linktitle: ( apiAction === this.API_ACTION.REMOVE || apiAction === this.API_ACTION.SAVE_TO_REMOVE ) ? '' : this.getValue()[1]
		} );
		delete( params.link ); // ? danwe: why is there an 'item' AND a 'link' param here?
		delete( params.item ); // ? danwe: why is there an 'item' AND a 'link' param here?
		delete( params.language );

		return params;
	}
function( textStatus, response, apiAction ) {
		var error = {};
		if ( textStatus != 'abort' ) {
			error = {
				code: textStatus,
				shortMessage: ( apiAction === this.API_ACTION.REMOVE )
					? mw.msg( 'wikibase-error-remove-connection' )
					: mw.msg( 'wikibase-error-save-connection' ),
				message: ''
			};
			if ( textStatus == 'timeout' ) {
				error.shortMessage = ( apiAction === this.API_ACTION.REMOVE )
					? mw.msg( 'wikibase-error-remove-timeout' )
					: mw.msg( 'wikibase-error-save-timeout' );
			} else {
				if ( typeof response.error != 'undefined' ) {
					error.code = response.error.code;
					error.message = response.error.info;
					error.shortMessage = ( apiAction === this.API_ACTION.REMOVE )
						? mw.msg( 'wikibase-error-remove-generic' )
						: mw.msg( 'wikibase-error-save-generic' );
				}
			}
		}
		this.showError( error, apiAction );
	}
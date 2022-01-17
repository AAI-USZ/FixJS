function() {
			// Load the language codes
			jQuery.ajax( {
				url      : Aloha.getPluginUrl( 'wai-lang' ) + '/lib/language-codes.json',
				dataType : 'json',
				success  : jQuery.proxy( this.storeLanguageCodes, this ),
				error    : this.errorHandler
			} );

		    this.repositoryName = 'WaiLanguages';
		}
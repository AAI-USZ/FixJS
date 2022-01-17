function() {
			var baseUrl = SCRIPT_LOADER_URL.replace( 'ResourceLoader.php', '' );
			var downloadUrl = baseUrl + 'modules/KalturaSupport/download.php/wid/' + this.kwidgetid;

			// Also add the uiconf id to the url:
			if( this.kuiconfid ){
				downloadUrl += '/uiconf_id/' + this.kuiconfid;
			}

			if( this.kentryid ) {
				downloadUrl += '/entry_id/'+ this.kentryid;
			}
			
			// Append KS
			var client = mw.kApiGetPartnerClient( this.kwidgetid );
			client.getKS(function( ks ){
				downloadUrl += '/?ks=' + ks;
				$( embedPlayer ).data( 'directDownloadUrl', downloadUrl );
			});
		}
function ( msgKey ){

			// Check for uiConf configured msgs:

			var message = 'An Error Has Occurred';

			var title = 'Error';

			if( _this.getPluginConfig( embedPlayer, 'strings', msgKey ) ) {

				message = _this.getPluginConfig( embedPlayer, 'strings', msgKey );

				if ( _this.getPluginConfig( embedPlayer, 'strings', msgKey + '_TITLE' ) ) {

					title = _this.getPluginConfig( embedPlayer, 'strings', msgKey + '_TITLE' );

				}

			}

			else {

			// If not found in the "strings" mapping then fallback to mwEmbed hosted default string:

			// XXX should be mw.getMsg in 1.7

				message = gM('ks-' + msgKey );

				title = gM('ks-' + msgKey + '_TITLE');

			}

			return {

				'message': message,

				'title': title

			}

		}
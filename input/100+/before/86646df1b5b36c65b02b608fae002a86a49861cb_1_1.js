function ( msgKey ){

			// Check for uiConf configured msgs:

			if( _this.getPluginConfig( embedPlayer, 'strings', msgKey ) ){

				return _this.getPluginConfig( embedPlayer, 'strings', msgKey );

			}

			// If not found in the "strings" mapping then fallback to mwEmbed hosted default string:

			// XXX should be mw.getMsg in 1.7

			return gM('ks-' + msgKey );

		}
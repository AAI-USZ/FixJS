function( embedPlayer ){

		var _this = this;



		embedPlayer.getRawKalturaConfig = function( confPrefix, attr ){

			return _this.getRawPluginConfig( embedPlayer, confPrefix, attr );

		};

		// Add getKalturaConfig to embed player:

		embedPlayer.getKalturaConfig = function( confPrefix, attr ){

			return _this.getPluginConfig( embedPlayer, confPrefix, attr );

		};



		// Extend plugin configuration

		embedPlayer.setKalturaConfig = function( pluginName, key, value ) {

			// no plugin/key - exit

			if ( ! pluginName || ! key ) {

				return false;

			}



			// Always create obj with plugin properties

			var objectSet = {};

			if( typeof key === "string" ) {

				objectSet[ key ] = value;

			}

			// The key could be an object with all plugin properties

			if( typeof key === "object" ) {

				objectSet = key;

			}



			// No player config, create the object

			if( ! embedPlayer.playerConfig ) {

				embedPlayer.playerConfig = {

					'plugins' : {},

					'vars' : {}

				};

			}

			// Plugin doesn't exists -> create it

			if( ! embedPlayer.playerConfig[ 'plugins' ][ pluginName ] ){

				embedPlayer.playerConfig[ 'plugins' ][ pluginName ] = objectSet;

			} else {

				// If our key is an object, and the plugin already exists, merge the two objects together

				if( typeof key === 'object' ) {

					$.extend( embedPlayer.playerConfig[ 'plugins' ][ pluginName ], objectSet);

					return false;

				}

				// If the old value is an object and the new value is an object merge them

				if( typeof embedPlayer.playerConfig[ 'plugins' ][ pluginName ][ key ] === 'object' && typeof value === 'object' ) {

					$.extend( embedPlayer.playerConfig[ 'plugins' ][ pluginName ][ key ], value );

				} else {

					embedPlayer.playerConfig[ 'plugins' ][ pluginName ][ key ] = value;

				}

			}

			// Sync iframe with attribute data updates:

			$( embedPlayer ).trigger( 'updateIframeData' );

		};



		// Add an exported plugin value:

		embedPlayer.addExportedObject = function( pluginName, objectSet ){

			// TODO we should support log levels in 1.7

			// https://github.com/kaltura/mwEmbed/issues/80

			if( console && console.log ){

				console.log( "KwidgetSupport:: addExportedObject is deprecated, please use standard setKalturaConfig" );

			}

			for( var key in objectSet ){

				embedPlayer.setKalturaConfig( pluginName, key, objectSet[key] );

			}

		};



		// Add isPluginEnabled to embed player:

		embedPlayer.isPluginEnabled = function( pluginName ) {

			// Always check with lower case first letter of plugin name: 

			var lcPluginName = pluginName[0].toLowerCase() + pluginName.substr(1);

			if( _this.getPluginConfig( embedPlayer, lcPluginName , 'plugin' ) ){

				// check for the disableHTML5 attribute

				if( _this.getPluginConfig( embedPlayer, lcPluginName , 'disableHTML5' ) ){

					return false;

				}

				return true;

			}

			return false;

		};

		// Add getFlashvars to embed player:

		embedPlayer.getFlashvars = function( param ) {

			var fv = embedPlayer.playerConfig['vars'] || {};

			if ( param ) {

				if ( param in fv ) {

					return fv[ param ];

				}

				else {

					return undefined;

				}

			}

			return fv;

		}

		

		embedPlayer.setFlashvars = function( key, value ) {

			if( key ) {

				embedPlayer.playerConfig['vars'][ key ] = value;

			}

		}



		// Adds support for custom message strings

		embedPlayer.getKalturaMsg = function ( msgKey ){

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

		};

	}
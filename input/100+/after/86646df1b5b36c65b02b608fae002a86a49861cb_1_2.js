function( embedPlayer, callback ){

		var _this = this;

		// Local function to defer the trigger of loaded cuePoints so that plugins have time to load

		// and setup their binding to KalturaSupport_CuePointsReady

		var doneWithUiConf = function(){

			if( embedPlayer.rawCuePoints ){

				mw.log("KWidgetSupport:: trigger KalturaSupport_CuePointsReady", embedPlayer.rawCuePoints);

				// Allow other plugins to subscribe to cuePoint ready event:

				$( embedPlayer ).trigger( 'KalturaSupport_CuePointsReady', embedPlayer.rawCuePoints );

			};



			// Trigger the early player events ( after uiConf handling has a chance to setup bindings

			if( embedPlayer.kalturaPlayerMetaData ){

				$( embedPlayer ).trigger( 'KalturaSupport_EntryDataReady', embedPlayer.kalturaPlayerMetaData );

			}

			if( embedPlayer.kalturaEntryMetaData ){

				$( embedPlayer ).trigger( 'KalturaSupport_MetadataReceived', embedPlayer.kalturaEntryMetaData );

			}



			// Run the DoneWithUiConf trigger

			// Allows modules that depend on other modules initialization to do what they need to do.

			mw.log("KWidgetSupport:: trigger KalturaSupport_DoneWithUiConf");



			// Don't stack

			setTimeout( function(){

				$( embedPlayer ).trigger( 'KalturaSupport_DoneWithUiConf' );

				callback();

			}, 0 );

		};



		// Sync iframe with attribute data updates:

		$( embedPlayer ).trigger( 'updateIframeData' );

		if( embedPlayer.$uiConf ){

			_this.baseUiConfChecks( embedPlayer );

			// Trigger the check kaltura uiConf event

			mw.log( "KWidgetSupport:: trigger KalturaSupport_CheckUiConf" );

			$( embedPlayer ).triggerQueueCallback( 'KalturaSupport_CheckUiConf', embedPlayer.$uiConf, function(){

				mw.log("KWidgetSupport::KalturaSupport_CheckUiConf done with all uiConf checks");

				// Trigger the api method for 1.6.7 and above ( eventually we will deprecate KalturaSupport_CheckUiConf );

				$( mw ).triggerQueueCallback( 'Kaltura_CheckConfig', embedPlayer, function(){

					// ui-conf file checks done

					doneWithUiConf();

				});

			});

		} else {

			doneWithUiConf();

		}

	}
function(){

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

		}
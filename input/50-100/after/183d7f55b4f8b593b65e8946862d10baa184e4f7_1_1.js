function( embedPlayer ){

		var target = embedPlayer.getRawKalturaConfig( 'fader', 'target' );

		if( target == "{controllersVbox}" ||

			target == "{controlsHolder}" ||

			target == "{controllerVertical}"

		){

			embedPlayer.overlaycontrols = true;

		} else {

			embedPlayer.overlaycontrols = false;

		}

	}
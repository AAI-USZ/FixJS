function( embedPlayer ){

		if( embedPlayer.getKalturaConfig( 'target' ) == "{controllersVbox}" || 

			embedPlayer.getKalturaConfig( 'target' ) == "{controlsHolder}" ||

			embedPlayer.getKalturaConfig( 'target' ) == "{controllerVertical}"

		){

			embedPlayer.overlaycontrols = true;

		} else {

			embedPlayer.overlaycontrols = false;

		}

	}
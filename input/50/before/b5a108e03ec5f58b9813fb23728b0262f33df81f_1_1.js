function(event, ui) {

		if(supports_local_storage()){

			//assumption made that localStrage capable browsers also support WebSQL

			ziedelft.webdb.getLocation(loadLocation, $.mobile.pageData.id);

		}else{

			//TODO: ASK DB

		}		

		

	}
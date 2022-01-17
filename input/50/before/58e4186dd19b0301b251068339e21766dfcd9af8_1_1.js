function(event, ui) {

		if(supports_local_storage()){

			//if the browser if capable of localStorage load cached information

			loadLocation($.mobile.pageData.id);

		}else{

			//TODO: ASK DB

		}		

		

	}
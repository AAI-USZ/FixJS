function( xhr, ajaxOptions, errorStr ){
				console.log("Error : " + errorStr);
				console.log(xhr.status);
				if(fallback)
					fallback(errorStr);
		    }
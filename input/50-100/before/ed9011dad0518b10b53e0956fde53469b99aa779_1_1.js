function(urlString){
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  		xmlhttp = new XMLHttpRequest();
	  	}
	  	else{
	  		console.log("incompatible browser"); //if they have IE6 hahaha
	  	}

	
		//xml parser goes here
		xmlhttp.open("GET",urlString,false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
}
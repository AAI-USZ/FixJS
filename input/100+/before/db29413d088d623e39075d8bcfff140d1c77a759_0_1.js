function() {	
	var filter = { urls: ["<all_urls>"] };
	var opt_extraInfoSpec = ["blocking", "requestHeaders"];

	var values = "";	
	for ( var key in localStorage ) {		
  	if ( key.match(/^dataPragma\d+/) ) {
  		values = values + localStorage.getItem(key);  		  		
  	}
	}

	values = $.trim(values);	

	if ( values != "" ) {
		chrome.webRequest.onBeforeSendHeaders.addListener(
			function(info) {								
				var newHeader = [ {name:'Pragma', value: values} ]; 		

				console.log("URL: " + info.url);    
				info.requestHeaders.push.apply(info.requestHeaders, newHeader); 				

				for( var header in info.requestHeaders ) {         
					for ( var key in info.requestHeaders[header] ) {            
						console.log("Header " + header + " [" + key + "] " + info.requestHeaders[header][key]);    
					}   
				}
					
				return {requestHeaders: info.requestHeaders};   
			}, filter, opt_extraInfoSpec);
	}
}
function ohmage(path, data, datafun){
		
		//input processing
		var data = data ? data : {};		
		var session = jQuery.parseJSON($.cookie("ohmage"))
		var serverurl = session ? session.serverurl : $("#serverurl").val();
		
		//This is only needed for safari. Chrome and FF will use the cookie:
		if(session && session.token) data.auth_token = session.token;
		
		//default parameter
		data.client = "omh-reporting"
			
		var myrequest = $.ajax({
			type: "POST",
			url : serverurl + path,
			data: data,
			xhrFields: {
				withCredentials: true
			}
		}).done(function(rsptxt) {
			if(!rsptxt || rsptxt == ""){
				alert("Undefined error.")
				return false;
			}
			response = jQuery.parseJSON(rsptxt);
			if(response.result == "success"){
				response.serverurl = serverurl;
				if(datafun) datafun(response)
			} else if(response.result == "failure") {
				processError(response.errors)
				return false;
			} else{
				alert("JSON response did not contain result attribute.")
			}
			
		}).error(function(){alert("Ohmage returned an undefined error.")});		
		
		return(myrequest)
	}
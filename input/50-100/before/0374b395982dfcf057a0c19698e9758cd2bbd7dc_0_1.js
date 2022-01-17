function processError(errors){
		if(response.errors[0].code && response.errors[0].code == "0200"){
			logout();
		} else {
			alert(response.errors[0].text)
		}
	}
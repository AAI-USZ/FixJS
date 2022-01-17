function(e) { 
	Titanium.API.debug("You clicked the button"); 
	if(!usernameField.value || !passwordField.value) {
		Ti.API.debug("missing data in fields");
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Sign-in Error',
		    message: 'Please enter both username and password',
		    buttonNames: ['OK']
		});
		alertDialog.show();
		return;
	}
	//loginBtn.title = 'Logging in...';
	
	var jsonTextToDisplay = '';
	var host = 'labs.evanschambers.com'; // 'localhost';
	Ti.API.debug("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+host+':8080/Bookbook/api/user/sign-in?username='+usernameField.value+'&password='+ passwordField.value;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		//Titanium.API.info(' Text: ' + this.responseText);
	    //var jsonObject = JSON.parse(this.responseText);
	    // searchBar.blur();
	    var resp = this.responseText;
	    
	    Ti.API.debug(resp);
	    if(resp == 'Login successful!') {
	    	//loginBtn.title = 'Loading app...';
	    	
	    	errorLabel.text = '';
	    	g_username = usernameField.value;
	    	win.close();
	    	
	    }
	    else {	
	    	errorLabel.text = resp;
	    	if(resp.indexOf('username') > -1) {
	    		usernameField.setValue('');
	    		usernameField.setBackgroundColor('red');
	    		usernameField.focus();
	    	}
	    	else if(resp.indexOf('password') > -1) {
	    		passwordField.setValue('');
	    		passwordField.setBackgroundColor('red');
	    		passwordField.focus();
	    	}
	    	else {
	    		
	    	}
	    	
	    }
	};
	
	xhr.onerror = function(e) {
		errorLabel.text = 'unable to reach bookup services';
		alert("ERROR " + e.error);
	};

	Ti.API.debug(url);
	xhr.open('GET', url);
	xhr.send();
}
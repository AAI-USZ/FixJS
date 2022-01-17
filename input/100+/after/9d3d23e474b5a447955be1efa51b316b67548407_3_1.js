function(e) { 
	Titanium.API.info("Done button clicked"); 
	
	// change the right nav button to a spinner
	win.setRightNavButton(spinnerButton);

	var regexValidateEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	var validationErrMsg = "";  
	
	if(!emailField.value || regexValidateEmail.test(emailField.value) == false) {
		validationErrMsg = "Please enter a valid email address";
	}  
	else if(!usernameField.value) {
		validationErrMsg = "Please enter a username";
	}
	else if(!passwordField.value) {
		validationErrMsg = "Please enter a password";
	}
	
	if(validationErrMsg != "") {
		showValidationErrorDialog(validationErrMsg);
		win.setRightNavButton(done);
		return;
	}
	
	var jsonTextToDisplay = '';
	
	Ti.API.info("about to send.  usernane field value -> " + usernameField.value)
	var url = Ti.App.SERVICE_BASE_URL + 'user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
	xhr.onerror = function() {
		
		win.setRightNavButton(done);
		showValidationErrorDialog("Unable to sign you up.  BookUp Web Services are currently unavailable.  Please try again soon.");
	}
	xhr.onload = function() {
		// set the right nav button back to done
		win.setRightNavButton(done);
		
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    var responseObject = eval('('+resp+')');
	    if(responseObject.error) { // backend error message
	    	showValidationErrorDialog(responseObject.error);
	    }
	    else { // successful
	    	// if the profile image has not be selected by the user, just complete the process
	    	if(g_profileImage == null) {
	    		g_doneDialog.show();
	    		return;
	    	}
	    	
	    	var urlPhoto = Ti.App.SERVICE_BASE_URL + 'user/'+responseObject.userName+'/photo';
        	Ti.API.info('Preparing to send data to: ' + urlPhoto);
        	win.setRightNavButton(spinnerButton);
          	
        	var xhr2 = Titanium.Network.createHTTPClient();
        	
        	xhr2.open("POST",urlPhoto);  
        	xhr2.setTimeout(REQUEST_TIMEOUT); // 10 second timeout
       		xhr2.send({myFile:g_profileImage});
			xhr2.onerror = function()  {
				win.setRightNavButton(done);
				showValidationErrorDialog("Your account was created, but we had problems uploading your profile image.  Please log in and set your profile image from the settings screen.");
			}
			
        	xhr2.onload = function() {
        		win.setRightNavButton(done);
			    var resp = this.responseText;  
			    Ti.API.info(resp);
			    if(!resp) { // no data returned means it was a success
			    	g_doneDialog.show();
			    	return;
			    }
			    else { // otherwise, there was an error
			    	showValidationErrorDialog(resp);
				}   	
        	}
	    }
	};

	Ti.API.debug(url);
	xhr.open('POST', url);
	xhr.send({'jsondata':{
		"id":0,
		"aboutMe":"",
		"activationMethod":"native",
		"email":emailField.value,
		"firstName":"null",
		"lastName":"null",
		"middleName":"null",
		"password":passwordField.value,
		"userName":usernameField.value,
		"userTypeCode":"user"
	}}); 
	
	//xhr.send({'jsondata':{"class":"bookbook.domain.User","id":null,"aboutMe":"","activationMethod":"native","createDate":"Sat Nov 12 01:39:32 EST 2011","email":"","endDate":null,"firstName":"Barack","lastLoginDate":null,"lastName":"Obama","middleName":"","password":"","photoUrl":"http://localhost:8080/Bookbook/images/maxavatar.jpg","updateDate":null,"userId":179,"userName":"yeswecan","userTypeCode":"user"}});
}
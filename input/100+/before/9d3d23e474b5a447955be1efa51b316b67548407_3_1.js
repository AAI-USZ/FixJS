function(e) { 
	Titanium.API.info("You clicked the button"); 
	
	// validate email format
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;   
	
	if(!emailField.value || reg.test(emailField.value) == false) {
		alert("ERROR - Please enter a valid email address");
		return;
	}  
	if(!usernameField.value) {
		alert("ERROR - Please enter a username");
		return;
	}
	if(!passwordField.value) {
		alert("ERROR - Please enter a password");
		return;
	}
	
	var jsonTextToDisplay = '';
	
	Ti.API.info("about to send.  usernane field value -> " + usernameField.value)
	var url = 'http://'+HOST+':8080/Bookbook/api/user';
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
	    var resp = this.responseText;  
	    Ti.API.info(resp);
	    
	    if(resp == 'user could not be added') {
	    	alert(resp);	
	    }
	    else { // successful
	    	var newUserObj = eval('('+resp+')');
	    	if(!g_profileImage) {
	    		alert("Your account has been created without a profile photo.  Please sign in.");
	    		closeThis();
	    	}
	    	var urlPhoto = 'http://'+HOST+':8080/Bookbook/api/user/'+newUserObj.userName+'/photo';
        	Ti.API.info(urlPhoto);
          	
			Ti.API.info("after creating data_to_send");
        	var xhr2 = Titanium.Network.createHTTPClient();
        	xhr2.open("POST",urlPhoto);  
       		xhr2.send({myFile:g_profileImage});
			
        	xhr2.onload = function() {
			    var resp = this.responseText;  
			    Ti.API.info(resp);
			    if(!resp) {
			    	alert("Your account has been created with profile photo.  Please sign in.");
			    	closeThis();
			    }
			    else {
			    	alert(resp);
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
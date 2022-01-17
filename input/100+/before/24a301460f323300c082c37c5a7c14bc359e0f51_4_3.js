function checkPassword(){
		var password = $('#password').val();												//get the password input value
		console.log("The password is:" + password);										//check the password value for debugging to be sure this registers correctly
		var passwordVal = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{6,12}$/);					//RegEx check for password
		if (!password) {
			$('#passwordControl').removeClass('success').addClass('error');
				$('#passwordControl').find('.help-inline').html('Please enter a password to register your account.');	//reminds user to enter a password in the field
		} 
		else if (!passwordVal.test(password)) {
			$('#passwordControl').removeClass('success').addClass('error');								//add error class to control group (turns inline text red)
				$('#passwordControl').find('.help-inline').html('Password must be 6-12 characters in length.');  //informs user of password specifications
		} 
		else{
			$('#passwordControl').removeClass('error').addClass('success');
			$('#passwordControl').find('.help-inline').html('Your password has been successfully validated.');//Feedback to user = Successful validation
		}
	}
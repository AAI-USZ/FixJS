function checkEmail(){
		var check = 'fail';															
		var email = $('#email').val();													//get the e-mail input value
		console.log("The e-mail is:" + email);											//check the e-mail value for debugging
		var emailVal = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);		//RegEx for E-mail
		if (!email){																	//if e-mail form is empty
			$('#emailControl').removeClass('success').addClass('error');				//add error class to control group
			$('#emailControl').find('.help-inline').html('Please enter a valid e-mail address.');	//Feedback to user for resubmit if empty
		} else if (!emailVal.test(email)) {													//RegEx check for e-mail
			$('#emailControl').removeClass('success').addClass('error');					//add error class to control group (turns inline text red)
			$('#emailControl').find('.help-inline').html('Revise your entry to include appropriate alphanumeric characters and symbols.');//Feedback to user for resubmit
		} else {
			$('#emailControl').removeClass('error').addClass('success');					//for a valid submission (turns inline text green)
				$('#emailControl').find('.help-inline').html('Your entry has been successfully validated.'); //Feedback to user = Successful Validation
			check = 'pass';

		}
				console.log('email check: ' + check);

		return check; 

	}
function checkLastName(){														//defines checkLastName function		
		var check = 'fail';															
		var lastName = $('#lastName').val();											//get the last name input value
		console.log("The user's last name is:" + lastName);							//check the last name value for debugging
		var lastNameVal = new RegExp(/^[A-Za-z]{2,20}$/);								//RegEx check for last name
		if(!lastName){
			$('#lastNameControl').removeClass('success').addClass('error');				//add error class to control group (turns inline text red)
			$('#lastNameControl').find('.help-inline').html('Please enter your name using alphabetical characters (A-Z) only.');	//Feedback to user for resubmit if empty
		} else if (!lastNameVal.test(lastName)) {
			$('#lastNameControl').removeClass('success').addClass('error');				//add error class to control group (turns inline text red)
			$('#lastNameControl').find('.help-inline').html('Revise your entry to include at least 2  alphabetical characters (A-Z) only and resubmit.');//Feedback to user for resubmit 
		} else { 
			$('#lastNameControl').removeClass('error').addClass('success');				//for a valid submission (turns inline text green)
			$('#lastNameControl').find('.help-inline').html('Your entry has been successfully validated.') 	//Feedback to user = Successful Validation
			check = 'pass';	
		}
		return check; 

	}
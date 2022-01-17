function checkFirstName(){																//defines checkFirstName function
		var firstName = $('#firstName').val();											//get the first name input value
		console.log("The user's first name is:" + firstName);							//check the first name value for debugging
		var firstNameVal = new RegExp(/^[A-Za-z]{3,20}$/);								//RegEx check for first name
		if(!firstName){
			$('#firstNameControl').removeClass('success').addClass('error');				//add error class to control group
			$('#firstNameControl').find('.help-inline').html('Please enter your name using alphabetical characters (A-Z) only.');	//Feedback to user for resubmit if empty
		} else if (!firstNameVal.test(firstName)) {
			$('#firstNameControl').removeClass('success').addClass('error');				//add error class to control group
			$('#firstNameControl').find('.help-inline').html('Revise your entry to include at least 3 alphabetical characters (A-Z) only and resubmit.');//Feedback to user for resubmit 
		} else { 
			$('#firstNameControl').removeClass('error').addClass('success');				//for a valid submission, green text (success)
			$('#firstNameControl').find('.help-inline').html('Your entry has been successfully validated') 	//Feedback to user = Successful Validation
		}
	}
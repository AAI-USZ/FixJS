function checkFacebook()
	{
		var check = 'pass';															
	
		var facebook = $('#facebook').val();												//get the facebook input value
		console.log("Facebook username is" + facebook);										//debugging check
		var facebookVal = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{5,14}/);						//regex check for facebook username 
		if (facebook) {
			if (!facebookVal.test(facebook)) {												//if there is a value entered, check the format
				$('#facebookControl').removeClass('success').addClass('error');				//if value entered does not meet format criteria, change text color to red
					$('#facebookControl').find('.help-inline').html('Your Facebook name must be between 5-14 characters');	//informs user of facebook input specifications
					check = 'fail';
			}
		else{																			//if the value of facebook meets criteria
				$('#facebookControl').removeClass('error').addClass('success');				//Change text color to green
				$('#facebookControl').find('.help-inline').html('Your Facebook account has been successfully validated.'); //Feedback to user = Successful validation
		var check = 'pass';															

			}
		}
				console.log('facebook check: ' + check);

		return check; 

	}
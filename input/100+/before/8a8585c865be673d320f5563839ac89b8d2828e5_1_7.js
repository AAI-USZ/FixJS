function checkTwitter(){							
		var check = 'pass';															

		var twitter = $('#twitter').val();														//defines twitter
		console.log("Twitter:@" + twitter);														//debugging check
		var twitterVal = new RegExp(/^[A-Za-z0-9_]{0,20}/);										//regex check for twitter value
		if(twitter) { 																			//if there is a value entered, check the format
			if (!twitterVal.test(twitter)) {													//if the format doesn't meet format criteria, change text color to red
				$('#twitterControl').removeClass('success').addClass('error');					
				$('#twitterControl').find('.help-inline').html('Your Twitter name must be between 0-20 characters');//informs user of twitter input specifications
				check = 'fail';
				} 
			else{																				//if the value of twitter meets format criteria
				$('#twitterControl').removeClass('error').addClass('success');					//change the text to green
				$('#twitterControl').find('.help-inline').html('Your Twitter account has been successfully validated.');//feedback to user = Successful validation
				}	
			}
		return check; 

	}
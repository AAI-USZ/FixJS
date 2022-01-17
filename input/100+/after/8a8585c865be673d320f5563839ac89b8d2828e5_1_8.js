function checkPhone(){
		var check = 'pass';															

		var phone = $('#phone').val();																//defines phone
		console.log("The phone number is:" + phone);												//debugging check
		var phoneVal = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);							//regex check for phone value (Based on U.S. 3+7 digit format)
		if(phone) {																					//if there is a phone input value
			if(!phoneVal.test(phone)) {																//test the phone input value against criteria 
				$('#phoneControl').removeClass('success').addClass('error');						//if the format doesn't meet critera, change text to red
				$('#phoneControl').find('.help-inline').html('Your phone number must be a valid 10 digit format');	//informs user of phone input value specifications
				check = 'fail';
				} 
		   	else{ 																				//if the value of phone meets the format criteria
				$('#phoneControl').removeClass('error').addClass('success');							//change the text to green
				$('#phoneControl').find('.help-inline').html('Your phone number has been successfully validated.');// feedback to user = Successful validation
		var check = 'pass';															
			
		}
	}
			console.log('phone check: ' + check);

		return check; 

	}
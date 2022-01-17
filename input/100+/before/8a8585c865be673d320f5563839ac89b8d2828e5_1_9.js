function checkWebsite(){
		var check = 'fail';															
		var website = $('#website').val();															//defines website
		console.log("The website url is " + website);												//debugging check
		var websiteVal = new RegExp(/((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/);											//regex check for website (extremely lenient)		
		if (website) {																				//if a website value is entered
			if (!websiteVal.test(website)) { 														//test the website input value against criteria
				$('#websiteControl').removeClass('success').addClass('error');						//if the format doesn't meet criteria, change text to red
				$('#websiteControl').find('.help-inline').html('Your website must follow traditional format (e.g. http://www.abcdefg.com).'); //informs user of website input value specifications
				check = 'fail';
				} 	
			else{																					//if the value of website meets the format criteria
				$('#websiteControl').removeClass('error').addClass('success');						//change the text color to green
				$('#websiteControl').find('.help-inline').html('Your website has been successfully validated.');	//feedback to user = Successful validation
		}
	}
		return check; 

}
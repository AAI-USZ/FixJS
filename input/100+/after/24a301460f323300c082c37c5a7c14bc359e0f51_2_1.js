function clearUserForm(){
		$('#addUserForm').find('input:text, input:password, input:file, select, textarea').val('');
		$('#imgPath').html('');
		// Removing validation
		$('#firstNameControl').removeClass('success').removeClass('error').find('.help-inline').html('Provide the First Name of the user.'); 	
		$('#lastNameControl').removeClass('success').removeClass('error').find('.help-inline').html('Provide the Last Name of the user.'); 	
		$('#emailControl').removeClass('success').removeClass('error').find('.help-inline').html('This will also be the username.'); 	
		$('#passwordControl').removeClass('success').removeClass('error').find('.help-inline').html('Enter password.'); 	
		$('#aboutControl').removeClass('success').removeClass('error').find('.help-inline').html('Briefly introduce yourself. Please limit your text to 1000 characters.'); 	
		$('#facebookControl').removeClass('success').removeClass('error').find('.help-inline').html('Facebook username.'); 	
		$('#twitterControl').removeClass('success').removeClass('error').find('.help-inline').html('Twitte username.'); 	
		$('#phoneControl').removeClass('success').removeClass('error').find('.help-inline').html('Phone number.'); 	
		$('#websiteControl').removeClass('success').removeClass('error').find('.help-inline').html('Website.'); 	

}
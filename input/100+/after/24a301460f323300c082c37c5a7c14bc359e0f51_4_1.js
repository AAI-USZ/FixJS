function ValidateUsers(){
	var validationState = 'fail';

	 
	if(checkFirstName() == 'pass' && checkLastName() == 'pass' && checkEmail() == 'pass' && checkPassword() == 'pass' && checkAbout() == 'pass' && checkFacebook() == 'pass' && checkTwitter() == 'pass' && checkPhone() == 'pass' && checkWebsite() == 'pass'){
		validationState = 'pass';
	}
	
	return validationState;
}
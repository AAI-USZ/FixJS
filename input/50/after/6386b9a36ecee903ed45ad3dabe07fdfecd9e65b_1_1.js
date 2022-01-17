function(){
	var resetButton = document.querySelectorAll('reset-button');
	resetButton.addEventListener('click', trackButtonClick);
	
	// check if options can be saved locally
	if (window.localStorage == null) {
		alert("LocalStorage must be enabled for managing options.");
		return;
	}
}
function reqpopup(){
	
	var currentUser = Parse.User.current();
if (currentUser) {
    // do stuff with the user
		
		
//Getting the variable's value from a link 
		var requestBox = $("#request-box");

		//Fade in the Popup
		$(requestBox).fadeIn(300);
		
		//Set the center alignment padding + border see css style
		var popMargTop = ($(window).height() - $(requestBox).height() ) / 2; 
		var popMargLeft = ($(window).width() - $(requestBox).width()) / 2; 
	
		$(requestBox).css({ 
			'margin-top' : popMargTop,
			'margin-left' : popMargLeft
		});
		
		// Add the mask to body
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
	
		
		
	}  else {
}}
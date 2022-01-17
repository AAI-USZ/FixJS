function checkAbout(){
		var check = 'pass';															
				
		var aboutSize = $('#userAbout').val().length; 
			aboutSize = 1000 - aboutSize;						
			 if (aboutSize <0 ) 
			 {
					$('#aboutControl').addClass('error');
					$('#aboutControl').find('.help-inline').html('You have exceeded 1000 characters, please revise. You have: <strong>' + aboutSize + '</strong> characters left.');	 
					check = 'fail';	
			  }
			  else 
			  {
				  	$('#aboutControl').removeClass('error');	
				  	$('#aboutControl').find('.help-inline').html('Briefly introduce yourself. Please limit your text to 1000 characters. You have: <strong>' + aboutSize + ' </strong> characters left.');
				  	check = 'pass';	
	 
			  } 
			  		console.log('about check: ' + check);

		return check; 

}
function checkAbout(){		
		var aboutSize = $('#userAbout').val().length; 						
			 if (aboutSize > 1000) 
			 {
					$('#aboutControl').addClass('error');
					$('#aboutControl').find('.help-inline').html('You have exceeded 1000 characters, please revise. You wrote a total of: <strong>' + aboutSize + '</strong> characters.');	 
			  }
			  else 
			  {
				  	$('#aboutControl').removeClass('error');	
				  	$('#aboutControl').find('.help-inline').html('Briefly introduce yourself. Please limit your text to 1000 characters. You wrote a total of: <strong>' + aboutSize + ' </strong> characters.');	 
			  } 
}
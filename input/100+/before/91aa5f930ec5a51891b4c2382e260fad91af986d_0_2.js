function (message) {
		var excludes = message;
		
		if(excludes.search("IllegalArgumentException") != -1){
			message = excludes.replace("java.lang.IllegalArgumentException:", "");
		}		
		if(excludes.search("RuntimeException") != -1){
			message = excludes.replace("java.lang.RuntimeException:", "");
		}	

		$('#file_uploaded_message').html("<div class='error_message'></div>");  		
		$('.error_message').html(message + "<br/>")  
			.append().hide().fadeIn(1500, function() {  
				$('.error_message').append("");  
		}).fadeOut(5000);	
	}
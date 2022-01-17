function() { 
		    $('#uploadForm').html("<div id='message'></div>");  
		    $('#message').html(second_msg)  
		    .append(first_msg)  
		    .hide()  
		    .fadeIn(1500, function() {  
		      $('#message').append("");  
		    }); 
		}
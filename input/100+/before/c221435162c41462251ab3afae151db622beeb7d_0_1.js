function() {
	     var name = $("#form_name").val();     
	     var email = $("#form_email").val();     
	     var text = $("#msg_text").val();     
	     var dataString = 'name='+ name + '&email=' + email + '&text=' + text;      

	     $.ajax({     
	     	type: "POST",     
	     	url: "../send.php",     
	     	data: dataString,     
	     	success: function(){       
	     		$('.success').fadeIn(1000).delay(1000).fadeOut(3000);     
	     	}     
	     });      
	     return false;  
	 }
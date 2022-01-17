function() {
	     var tag = $(this).find('tag').text();
	     var content = $(this).find('content').text();
	     
	       $('a#'+tag).click(function(){
		 $('#content').hide();
		 $('#content').html(content);
		 $('#content').fadeIn(1500);
	       });
	     
	   }
function(e){
		e.preventDefault();
		$.ajax({
			context: this,
			type: "GET",
			url: $(this).attr('href'),
			success: function(data){
				$(this).parents('.formsetfieldwrap').slideUp({duration:300,queue:false}).fadeOut({duration:300,queue:false});
			}
		});
	}
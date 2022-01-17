function(event){
		event.preventDefault();
		target_url = $(this).attr('href');
		$.ajax({
			url: target_url,
			dataType: "html",
			cache: false,
			success: function(data) {
				$("#content_holder").fadeOut(100, function(){
					$("#content_holder").html("").html(data).fadeIn('slow');
				});
			}
		});
	}
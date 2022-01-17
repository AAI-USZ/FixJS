function(){
		var text = $("textarea").val().trim().split(" ").length
		$("#processing-result").html(text)
	}
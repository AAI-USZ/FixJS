function(evt, data, status, xhr){
		var $form = $(this);

		// Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
		$form.find('textarea,input[type="text"],input[type="file"]').val("");
		$form.find('div.clearfix').removeClass("error");

		// Insert response partial into page below the form.
		$featuresList = $form.closest("article").find("ul");
		$featuresList.append(xhr.responseText);
		$featuresList.find("li").last().find("p").addClass("flash").delay(200).queue(function(next){
		   $(this).removeClass("flash");

		});
		updatePosition();
		$(".action-link.sort").hide();
		updateActivity();
	}
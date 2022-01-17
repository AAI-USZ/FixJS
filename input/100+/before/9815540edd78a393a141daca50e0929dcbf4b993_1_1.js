function(event, ui){

	  $(this).addClass('a4c_idle');

	  if ($(this).css("left").substring(0, $(this).css("left").length - 2) > $(window).width() / 2) {

		$(this).css("right", $(window).width() - $(this).css("left").substring(0, $(this).css("left").length - 2) - 125	).css("left", "auto");

	  }

	  save_ad_positions();

	}
function() {

		$(".wrapper").height("100%")

		$(".wrapper").height($(".wrapper").outerHeight() - (($(".controls").outerHeight()) + $(".header").outerHeight()) + "px");

	}
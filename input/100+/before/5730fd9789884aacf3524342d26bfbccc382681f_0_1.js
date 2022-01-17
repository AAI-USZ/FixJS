function() {
	var SIDEBAR_SHOWN = true;
	$(".toggle-sidebar").click(function() {
		if (SIDEBAR_SHOWN === true) {
			SIDEBAR_SHOWN = false;
			$(".articles").addClass("width-max");
			$(".toggle-sidebar span").html("<<");
			$(".sidebar").removeClass("open");
			$(".sidebar").addClass("close");
			$(".sidebar-content").hide();
		}
		else {
			SIDEBAR_SHOWN = true;
			$(".articles").removeClass("width-max");
			$(".toggle-sidebar span").html(">>");
			$(".sidebar").removeClass("close");
			$(".sidebar").addClass("open");
			$(".sidebar-content").show();
		}
	});

	var h1 = parseInt($(".sidebar-content").css("height").replace("px", ""), 10);
	if (h1 > parseInt($(".main-content").css("height").replace("px", ""), 10)) {
		$(".main-content").css("height", h1 + 40);
	}
}
function ( direction, callback ) {
	var view = $(this).closest("view");
	direction = direction || "left";
	view.UISetTranstionType("flip-" + direction);
	$(this).unbind().bind(window.tapOrClick, function(e) {
		switch (direction) {
			case "right":
				view.find("subview:nth-of-type(1)").toggleClassName("flip-right-front-in", "flip-right-front-out");
				view.find("subview:nth-of-type(2)").toggleClassName("flip-right-back-in", "flip-right-back-out");
				break;
			case "left":
				view.find("subview:nth-of-type(1)").toggleClassName("flip-left-front-in","flip-left-front-out");
				view.find("subview:nth-of-type(2)").toggleClassName("flip-left-back-in","flip-left-back-out");
				break;
			case "top":
			view.find("subview:nth-of-type(2)").toggleClassName("flip-top-front-in","flip-top-front-out");
				view.find("subview:nth-of-type(1)").toggleClassName("flip-top-back-in","flip-top-back-out");
				break;
			case "bottom":
				view.find("subview:nth-of-type(2)").toggleClassName("flip-bottom-front-in","flip-bottom-front-out");
				view.find("subview:nth-of-type(1)").toggleClassName("flip-bottom-back-in","flip-bottom-back-out");
				break;
			default:
				view.find("subview:nth-of-type(1)").toggleClassName("flip-right-front-in","flip-right-front-out");
				view.find("subview:nth-of-type(2)").toggleClassName("flip-right-back-in","flip-right-back-out");
		}
		if(callback) {
			callback(e);
		}
	});
}
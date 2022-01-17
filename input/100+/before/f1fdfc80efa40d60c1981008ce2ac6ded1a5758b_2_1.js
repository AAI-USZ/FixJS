function() {
	var div = jQuery( "<div>" ).appendTo(document.body).css({
		"position": "absolute",
		"top": 0,
		"left": 10
	});
	jQuery.cssProps.top = "left";
	equal( div.css("top"), "10px", "the fixed property is used when accessing the computed style");
	div.css("top", "100px");
	equal( div[0].style.left, "100px", "the fixed property is used when setting the style");
	// cleanup jQuery.cssProps
	jQuery.cssProps.top = undefined;
}
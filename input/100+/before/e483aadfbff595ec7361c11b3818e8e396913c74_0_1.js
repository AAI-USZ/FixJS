function() {
	$.body = $("body");
	$.app = $("app");
	$.main = $("#main");
	$.views = $("view");
	$.tablet = window.innerWidth > 600;
	$(window).bind("resize", function() {
		$.tablet = window.innerWidth > 600;
	});
	$.touchEnabled = ('ontouchstart' in window);
	if (!$.touchEnabled) {
		var stylesheet = $('head').find('link[rel=stylesheet]').attr('href');
		var stylesheet1 = stylesheet.replace(/chui\.css/, 'chui.desktop.css');
		$('head').append('<link rel="stylesheet" href="' + stylesheet1 + '">');
	}
}
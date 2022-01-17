function() {
	window.tap = ('ontouchstart' in window);
	window.tapOrClick = (this.tap)?"tap":"click";
	$.body = $("body");
	$.app = $("app");
	$.main = $("#main");
	$.views = $("view");
    $.currentTabSubViewId = "";
	$.currentViewId = "#main";
	$.tablet = window.innerWidth > 600;
	$(window).bind("resize", function() {
		$.tablet = window.innerWidth > 600;
	});
}
function ( ) {
	var view = $(this).closest("view");
	view.UISetTranstionType("pop");
	$(this).bind("click", function() {
		$("subview:nth-of-type(2)", view).toggleClassName("pop-in","pop-out");	
	});
}
function() {
	expect(1);
	equal( jQuery("#foo").text("<div").text(undefined)[0].innerHTML, "&lt;div", ".text(undefined) is chainable (#5571)" );
}
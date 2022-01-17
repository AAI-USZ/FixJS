function() {
	expect(1);
	equal( baidu("#foo").text("<div").text(undefined)[0].innerHTML, "&lt;div", ".text(undefined) is chainable (#5571)" );
}
function(valueObj) {
	expect(4);
	var val = valueObj("<div><b>Hello</b> cruel world!</div>");
	equal( baidu("#foo").text(val)[0].innerHTML.replace(/>/g, "&gt;"), "&lt;div&gt;&lt;b&gt;Hello&lt;/b&gt; cruel world!&lt;/div&gt;", "Check escaped text" );

	// using contents will get comments regular, text, and comment nodes
	var j = baidu("#nonnodes").contents();
	j.text(valueObj("hi!"));
	equal( baidu(j[0]).text(), "hi!", "Check node,textnode,comment with text()" );
	equal( j[1].nodeValue, " there ", "Check node,textnode,comment with text()" );

	// Blackberry 4.6 doesn't maintain comments in the DOM
	equal( baidu("#nonnodes")[0].childNodes.length < 3 ? 8 : j[2].nodeType, 8, "Check node,textnode,comment with text()" );
}
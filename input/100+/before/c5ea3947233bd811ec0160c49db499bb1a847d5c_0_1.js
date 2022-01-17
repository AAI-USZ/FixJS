function(valueObj) {
	expect(35);

	jQuery["scriptorder"] = 0;

	var div = jQuery("#qunit-fixture > div");
	div.html(valueObj("<b>test</b>"));
	var pass = true;
	for ( var i = 0; i < div.size(); i++ ) {
		if ( div.get(i).childNodes.length != 1 ) {
			pass = false;
		}
	}
	ok( pass, "Set HTML" );

	div = jQuery("<div/>").html( valueObj("<div id='parent_1'><div id='child_1'/></div><div id='parent_2'/>") );

	equal( div.children().length, 2, "Make sure two child nodes exist." );
	equal( div.children().children().length, 1, "Make sure that a grandchild exists." );

	var space = jQuery("<div/>").html(valueObj("&#160;"))[0].innerHTML;
	ok( /^\xA0$|^&nbsp;$/.test( space ), "Make sure entities are passed through correctly." );
	equal( jQuery("<div/>").html(valueObj("&amp;"))[0].innerHTML, "&amp;", "Make sure entities are passed through correctly." );

	jQuery("#qunit-fixture").html(valueObj("<style>.foobar{color:green;}</style>"));

	equal( jQuery("#qunit-fixture").children().length, 1, "Make sure there is a child element." );
	equal( jQuery("#qunit-fixture").children()[0].nodeName.toUpperCase(), "STYLE", "And that a style element was inserted." );

	QUnit.reset();
	// using contents will get comments regular, text, and comment nodes
	var j = jQuery("#nonnodes").contents();
	j.html(valueObj("<b>bold</b>"));

	// this is needed, or the expando added by jQuery unique will yield a different html
	j.find("b").removeData();
	equal( j.html().replace(/ xmlns="[^"]+"/g, "").toLowerCase(), "<b>bold</b>", "Check node,textnode,comment with html()" );

	jQuery("#qunit-fixture").html(valueObj("<select/>"));
	jQuery("#qunit-fixture select").html(valueObj("<option>O1</option><option selected='selected'>O2</option><option>O3</option>"));
	equal( jQuery("#qunit-fixture select").val(), "O2", "Selected option correct" );

	var $div = jQuery("<div />");
	equal( $div.html(valueObj( 5 )).html(), "5", "Setting a number as html" );
	equal( $div.html(valueObj( 0 )).html(), "0", "Setting a zero as html" );

	var $div2 = jQuery("<div/>"), insert = "&lt;div&gt;hello1&lt;/div&gt;";
	equal( $div2.html(insert).html().replace(/>/g, "&gt;"), insert, "Verify escaped insertion." );
	equal( $div2.html("x" + insert).html().replace(/>/g, "&gt;"), "x" + insert, "Verify escaped insertion." );
	equal( $div2.html(" " + insert).html().replace(/>/g, "&gt;"), " " + insert, "Verify escaped insertion." );

	var map = jQuery("<map/>").html(valueObj("<area id='map01' shape='rect' coords='50,50,150,150' href='http://www.jquery.com/' alt='jQuery'>"));

	equal( map[0].childNodes.length, 1, "The area was inserted." );
	equal( map[0].firstChild.nodeName.toLowerCase(), "area", "The area was inserted." );

	QUnit.reset();

	jQuery("#qunit-fixture").html(valueObj("<script type='something/else'>ok( false, 'Non-script evaluated.' );</script><script type='text/javascript'>ok( true, 'text/javascript is evaluated.' );</script><script>ok( true, 'No type is evaluated.' );</script><div><script type='text/javascript'>ok( true, 'Inner text/javascript is evaluated.' );</script><script>ok( true, 'Inner No type is evaluated.' );</script><script type='something/else'>ok( false, 'Non-script evaluated.' );</script><script type='type/ecmascript'>ok( true, 'type/ecmascript evaluated.' );</script></div>"));

	var child = jQuery("#qunit-fixture").find("script");

	equal( child.length, 2, "Make sure that two non-JavaScript script tags are left." );
	equal( child[0].type, "something/else", "Verify type of script tag." );
	equal( child[1].type, "something/else", "Verify type of script tag." );

	jQuery("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));
	jQuery("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));
	jQuery("#qunit-fixture").html(valueObj("<script>ok( true, 'Test repeated injection of script.' );</script>"));

	jQuery("#qunit-fixture").html(valueObj("<script type='text/javascript'>ok( true, 'jQuery().html().evalScripts() Evals Scripts Twice in Firefox, see #975 (1)' );</script>"));

	jQuery("#qunit-fixture").html(valueObj("foo <form><script type='text/javascript'>ok( true, 'jQuery().html().evalScripts() Evals Scripts Twice in Firefox, see #975 (2)' );</script></form>"));

	jQuery("#qunit-fixture").html(valueObj("<script>equal(jQuery.scriptorder++, 0, 'Script is executed in order');equal(jQuery('#scriptorder').length, 1,'Execute after html (even though appears before)')<\/script><span id='scriptorder'><script>equal(jQuery.scriptorder++, 1, 'Script (nested) is executed in order');equal(jQuery('#scriptorder').length, 1,'Execute after html')<\/script></span><script>equal(jQuery.scriptorder++, 2, 'Script (unnested) is executed in order');equal(jQuery('#scriptorder').length, 1,'Execute after html')<\/script>"));
}
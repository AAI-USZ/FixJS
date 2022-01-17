function() {

	expect(46);	



	equal( baidu("#text1").attr("type"), "text", "Check for type attribute" );

	equal( baidu("#radio1").attr("type"), "radio", "Check for type attribute" );

	equal( baidu("#check1").attr("type"), "checkbox", "Check for type attribute" );

	equal( baidu("#simon1").attr("rel"), "bookmark", "Check for rel attribute" );

	equal( baidu("#google").attr("title"), "Google!", "Check for title attribute" );

	equal( baidu("#mark").attr("hreflang"), "en", "Check for hreflang attribute" );

	equal( baidu("#en").attr("lang"), "en", "Check for lang attribute" );

	equal( baidu("#simon").attr("class"), "blog link", "Check for class attribute" );

	equal( baidu("#name").attr("name"), "name", "Check for name attribute" );

	equal( baidu("#text1").attr("name"), "action", "Check for name attribute" );

	ok( baidu("#form").attr("action").indexOf("formaction") >= 0, "Check for action attribute" );

	equal( baidu("#text1").attr("value", "t").attr("value"), "t", "Check setting the value attribute" );

	equal( baidu("<div value='t'></div>").attr("value"), "t", "Check setting custom attr named 'value' on a div" );

	equal( baidu("#form").attr("blah", "blah").attr("blah"), "blah", "Set non-existant attribute on a form" );

	equal( baidu("#foo").attr("height"), undefined, "Non existent height attribute should return undefined" );



	// [7472] & [3113] (form contains an input with name="action" or name="id")

	var extras = baidu("<input name='id' name='name' /><input id='target' name='target' />").appendTo("#testForm");

	equal( baidu("#form").attr("action","newformaction").attr("action"), "newformaction", "Check that action attribute was changed" );

	equal( baidu("#testForm").attr("target"), undefined, "Retrieving target does not equal the input with name=target" );

	equal( baidu("#testForm").attr("target", "newTarget").attr("target"), "newTarget", "Set target successfully on a form" );

	equal( baidu("#testForm").removeAttr("id").attr("id"), undefined, "Retrieving id does not equal the input with name=id after id is removed [#7472]" );

	// Bug #3685 (form contains input with name="name")

	equal( baidu("#testForm").attr("name"), undefined, "Retrieving name does not retrieve input with name=name" );

	extras.remove();



	equal( baidu("#text1").attr("maxlength"), "30", "Check for maxlength attribute" );

	equal( baidu("#text1").attr("maxLength"), "30", "Check for maxLength attribute" );

	equal( baidu("#area1").attr("maxLength"), "30", "Check for maxLength attribute" );



	// using innerHTML in IE causes href attribute to be serialized to the full path

	baidu("<a/>").attr({ "id": "tAnchor5", "href": "#5" }).appendTo("#qunit-fixture");

	equal( baidu("#tAnchor5").attr("href"), "#5", "Check for non-absolute href (an anchor)" );



	// list attribute is readonly by default in browsers that support it

	baidu("#list-test").attr("list", "datalist");

	equal( baidu("#list-test").attr("list"), "datalist", "Check setting list attribute" );



	// Related to [5574] and [5683]

	var body = document.body, $body = baidu(body);



	strictEqual( $body.attr("foo"), undefined, "Make sure that a non existent attribute returns undefined" );



	body.setAttribute("foo", "baz");

	equal( $body.attr("foo"), "baz", "Make sure the dom attribute is retrieved when no expando is found" );



	$body.attr("foo","cool");

	equal( $body.attr("foo"), "cool", "Make sure that setting works well when both expando and dom attribute are available" );



	body.removeAttribute("foo"); // Cleanup



	var select = document.createElement("select"), optgroup = document.createElement("optgroup"), option = document.createElement("option");

	optgroup.appendChild( option );

	select.appendChild( optgroup );



	equal( baidu( option ).attr("selected"), "selected", "Make sure that a single option is selected, even when in an optgroup." );



	var $img = $("<img style='display:none;' width='215' height='53' src='http://static.jquery.com/files/rocker/images/logo_jquery_215x53.gif'/>").appendTo("body");



	equal( $img.attr("width"), "215", "Retrieve width attribute an an element with display:none." );

	equal( $img.attr("height"), "53", "Retrieve height attribute an an element with display:none." );



	// Check for style support

	ok( !!~baidu("#dl").attr("style").indexOf("position"), "Check style attribute getter, also normalize css props to lowercase" );

	ok( !!~baidu("#foo").attr("style", "position:absolute;").attr("style").indexOf("position"), "Check style setter" );



	// Check value on button element (#1954)

	var $button = baidu("<button value='foobar'>text</button>").insertAfter("#button");

	equal( $button.attr("value"), "foobar", "Value retrieval on a button does not return innerHTML" );

	equal( $button.attr("value", "baz").html(), "text", "Setting the value does not change innerHTML" );



	// Attributes with a colon on a table element (#1591)

	equal( baidu("#table").attr("test:attrib"), undefined, "Retrieving a non-existent attribute on a table with a colon does not throw an error." );

	equal( baidu("#table").attr("test:attrib", "foobar").attr("test:attrib"), "foobar", "Setting an attribute on a table with a colon does not throw an error." );



	var $form = baidu("<form class='something'></form>").appendTo("#qunit-fixture");

	equal( $form.attr("class"), "something", "Retrieve the class attribute on a form." );



	var $a = baidu("<a href='#' onclick='something()'>Click</a>").appendTo("#qunit-fixture");

	equal( $a.attr("onclick"), "something()", "Retrieve ^on attribute without anonymous function wrapper." );



	ok( baidu("<div/>").attr("doesntexist") === undefined, "Make sure undefined is returned when no attribute is found." );

	ok( baidu("<div/>").attr("title") === undefined, "Make sure undefined is returned when no attribute is found." );

	equal( baidu("<div/>").attr("title", "something").attr("title"), "something", "Set the title attribute." );

	ok( baidu().attr("doesntexist") === undefined, "Make sure undefined is returned when no element is there." );

	equal( baidu("<div/>").attr("value"), undefined, "An unset value on a div returns undefined." );

	equal( baidu("<input/>").attr("value"), "", "An unset value on an input returns current value." );



	$form = baidu("#form").attr("enctype", "multipart/form-data");

	equal( $form.prop("enctype"), "multipart/form-data", "Set the enctype of a form (encoding in IE6/7 #6743)" );

}
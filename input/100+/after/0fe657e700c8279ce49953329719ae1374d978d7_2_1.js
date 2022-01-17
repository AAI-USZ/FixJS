function() {

	expect(3);

	var pass = true;

	baidu("div").attr({"foo": "baz", "zoo": "ping"}).each(function(){

		if ( this.getAttribute("foo") != "baz" && this.getAttribute("zoo") != "ping" ) {

			pass = false;

		}

	});

	ok( pass, "Set Multiple Attributes" );

	equal( baidu("#text1").attr({"value": function() { return this["id"]; }})[0].value, "text1", "Set attribute to computed value #1" );

	equal( baidu("#text1").attr({"title": function(i) { return i; }}).attr("title"), "0", "Set attribute to computed value #2");

}
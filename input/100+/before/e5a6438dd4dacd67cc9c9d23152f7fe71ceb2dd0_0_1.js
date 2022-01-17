function() {
	expect(29);
	t( "Child", "p > a", ["simon1","google","groups","mark","yahoo","simon"] );
	t( "Child", "p> a", ["simon1","google","groups","mark","yahoo","simon"] );
	t( "Child", "p >a", ["simon1","google","groups","mark","yahoo","simon"] );
	t( "Child", "p>a", ["simon1","google","groups","mark","yahoo","simon"] );
	t( "Child w/ Class", "p > a.blog", ["mark","simon"] );
	t( "All Children", "code > *", ["anchor1","anchor2"] );
	t( "All Grandchildren", "p > * > *", ["anchor1","anchor2"] );
	t( "Adjacent", "a + a", ["groups"] );
	t( "Adjacent", "a +a", ["groups"] );
	t( "Adjacent", "a+ a", ["groups"] );
	t( "Adjacent", "a+a", ["groups"] );
	t( "Adjacent", "p + p", ["ap","en","sap"] );
	t( "Adjacent", "p#firstp + p", ["ap"] );
	t( "Adjacent", "p[lang=en] + p", ["sap"] );
	t( "Adjacent", "a.GROUPS + code + a", ["mark"] );
	t( "Comma, Child, and Adjacent", "a + a, code > a", ["groups","anchor1","anchor2"] );
	t( "Element Preceded By", "p ~ div", ["foo", "moretests","tabindex-tests", "liveHandlerOrder", "siblingTest"] );
	t( "Element Preceded By", "#first ~ div", ["moretests","tabindex-tests", "liveHandlerOrder", "siblingTest"] );
	t( "Element Preceded By", "#groups ~ a", ["mark"] );
	t( "Element Preceded By", "#length ~ input", ["idTest"] );
	t( "Element Preceded By", "#siblingfirst ~ em", ["siblingnext"] );
	same( jQuery("#siblingfirst").find("~ em").get(), q("siblingnext"), "Element Preceded By with a context." );
	same( jQuery("#siblingfirst").find("+ em").get(), q("siblingnext"), "Element Directly Preceded By with a context." );

	t( "Verify deep class selector", "div.blah > p > a", [] );

	t( "No element deep selector", "div.foo > span > a", [] );

	same( jQuery("> :first", document.getElementById("nothiddendiv")).get(), q("nothiddendivchild"), "Verify child context positional selctor" );
	same( jQuery("> :eq(0)", document.getElementById("nothiddendiv")).get(), q("nothiddendivchild"), "Verify child context positional selctor" );
	same( jQuery("> *:first", document.getElementById("nothiddendiv")).get(), q("nothiddendivchild"), "Verify child context positional selctor" );

	t( "Non-existant ancestors", ".fototab > .thumbnails > a", [] );
}
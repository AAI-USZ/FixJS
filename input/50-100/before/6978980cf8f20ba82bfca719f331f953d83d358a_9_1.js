function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).outerHeight(), 100, "check " + tag + " outerHeight()" );
    equal( baidu.dom( el ).outerHeight( true ), 120, "check " + tag + " outerHeight( true )" );
    el.parentNode.removeChild( el );
}
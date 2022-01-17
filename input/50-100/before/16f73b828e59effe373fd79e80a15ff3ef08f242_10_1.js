function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).outerWidth(), 100, "check " + tag + " outerWidth()" );
    equal( baidu.dom( el ).outerWidth( true ), 120, "check " + tag + " outerWidth( true )" );
    el.parentNode.removeChild( el );
}
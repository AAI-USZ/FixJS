function testGet( tag ){
	var el = create( tag );
	equal( baidu.dom( el ).outerWidth(), el.offsetWidth, "check " + tag + " outerWidth()" );
	equal( baidu.dom( el ).outerWidth( true ), el.offsetWidth + style(el, 'margin') * 2, "check " + tag + " outerWidth( true )" );
//    equal( baidu.dom( el ).outerWidth(), 100, "check " + tag + " outerWidth()" );
//    equal( baidu.dom( el ).outerWidth( true ), 140, "check " + tag + " outerWidth( true )" );
    el.parentNode.removeChild( el );
}
function testGet( tag ){
	var el = create( tag );
	equal( baidu.dom( el ).outerHeight(), el.offsetHeight, "check " + tag + " outerHeight()" );
	equal( baidu.dom( el ).outerHeight( true ), el.offsetHeight + style(el, 'margin') * 2, "check " + tag + " outerHeight( true )" );
	
	
	
//    equal( baidu.dom( el ).outerHeight(), 100, "check " + tag + " outerHeight()" );
//    equal( baidu.dom( el ).outerHeight( true ), 140, "check " + tag + " outerHeight( true )" );
    el.parentNode.removeChild( el );
}
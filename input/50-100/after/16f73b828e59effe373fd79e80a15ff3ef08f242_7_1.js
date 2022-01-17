function testGet( tag ){
	var el = create( tag );
	baidu.dom(el).innerWidth();
	equal( baidu.dom( el ).innerWidth(),
	   el.offsetWidth - style(el, 'borderWidth') * 2, "check " + tag + " innerWidth" );
//    equal( baidu.dom( el ).innerWidth(), 60, "check " + tag + " innerWidth" );
    el.parentNode.removeChild( el );
}
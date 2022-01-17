function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).innerWidth(), 60, "check " + tag + " innerWidth" );
    el.parentNode.removeChild( el );
}
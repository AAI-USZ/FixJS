function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).innerHeight(), 60, "check " + tag + " innerHeight" );
    el.parentNode.removeChild( el );
}
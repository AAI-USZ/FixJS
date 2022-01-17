function(){
	equal( baidu.dom( window ).height(), document.body.clientHeight, "window" );
	equal( baidu.dom( document ).height(), document.body.clientHeight, "document" );
}
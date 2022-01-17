function(){
	equal( baidu.dom( window ).width(), document.body.clientWidth, "window" );
	equal( baidu.dom( document ).width(), document.body.clientWidth, "document" );
}
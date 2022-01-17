function(){
    var doc = document.documentElement,
        clientVal = doc.clientHeight,
        scrollVal = doc.scrollHeight;
	equal( baidu.dom( window ).height(), clientVal, "window" );
	equal( baidu.dom( document ).height(), Math.max(clientVal, scrollVal), "document" );
}
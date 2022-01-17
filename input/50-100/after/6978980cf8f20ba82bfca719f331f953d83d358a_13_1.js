function(){
    var doc = document.documentElement,
        clientVal = doc.clientWidth,
        scrollVal = doc.scrollWidth;
	equal( baidu.dom( window ).width(), clientVal, "window" );
	equal( baidu.dom( document ).width(), Math.max(clientVal, scrollVal), "document" );
}
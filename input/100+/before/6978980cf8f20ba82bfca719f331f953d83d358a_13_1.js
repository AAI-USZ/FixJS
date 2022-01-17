function diff( el, number ){
	el = create( el );
	el.style.margin = el.style.padding = "10px";
    equal( baidu.dom( el ).width( number ).width(), isNaN( number ) ? 0 : Math.max( number, 0 ), "针对 " + el + " 节点设置(" + number + ")和取得 width");

    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}
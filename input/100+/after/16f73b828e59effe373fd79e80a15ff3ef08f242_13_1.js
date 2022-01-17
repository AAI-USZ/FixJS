function diff( el, number ){
    var tagName = el.toLowerCase(),
        prop = tagName === 'input' ? 'value' : 'innerHTML';
	el = create( el );
	el.style.margin = el.style.padding = "10px";
	!~'body'.indexOf(tagName) && (el[prop] = '&nbsp');
	equal( baidu.dom( el ).width( number ).width(),
	   el.offsetWidth - style(el, 'borderWidth') * 2 - style(el, 'padding') * 2,
	   "针对 " + el.tagName + " 节点设置(" + number + ")和取得 width");
	
//    equal( baidu.dom( el ).width( number ).width(), isNaN( number ) ? 0 : Math.max( number, 0 ), "针对 " + el + " 节点设置(" + number + ")和取得 width");

    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}
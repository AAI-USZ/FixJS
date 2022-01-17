function diff( el, number ){
	el = create( el );
	el.style.margin = el.style.padding = "10px";
	el[el.tagName.toLowerCase() === 'input' ? 'value' : 'innerHTML'] = '&nbsp';
	
	equal(baidu.dom(el).height(number).height(),
	   el.offsetHeight - style(el, 'borderWidth') * 2 - style(el, 'padding') * 2,
	   "针对 " + el.tagName + " 节点设置(" + number + ")和取得 height");
	
    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}
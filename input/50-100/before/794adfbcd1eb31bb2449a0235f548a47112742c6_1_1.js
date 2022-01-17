function(ele,onEvent,fun){
 	onEvent = replace(/^\s*on/,'');
 	var element = baidu.dom.g(ele);
	baidu.dom(element).on(onEvent,fun);
	return element;
 }
function(options) {
	var hide = options.hide,
		show = options.show;
	var showController = hui.transition[show.effect],
		hideController = hui.transition[hide.effect];
		
	hui.style.set(options.container,{height:options.container.clientHeight+'px',position:'relative'})
	hui.style.set(hide.element,{width:options.container.clientWidth+'px',position:'absolute',boxSizing:'border-box'})
	hui.style.set(show.element,{width:options.container.clientWidth+'px',position:'absolute',display:'block',visibility:'hidden',boxSizing:'border-box'})
	
	hui.animate({
		node : options.container,
		css : {height:show.element.clientHeight+'px'},
		duration : options.duration+10,
		ease : hui.ease.slowFastSlow,
		onComplete : function() {
			hui.style.set(options.container,{height:'',position:''})
		}
	})
	hideController.beforeHide(hide.element);
	hideController.hide(hide.element,options.duration,function() {
		hui.style.set(hide.element,{display:'none',position:'static',width:''})
	})
	
	showController.beforeShow(show.element);
	hui.style.set(show.element,{display:'block',visibility:'visible'})
	showController.show(show.element,options.duration,function() {
		hui.style.set(show.element,{position:'static',width:''})
	});
}
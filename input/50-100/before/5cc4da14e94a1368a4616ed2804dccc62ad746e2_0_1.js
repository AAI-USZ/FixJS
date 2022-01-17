function(element,duration,onComplete) {
		hui.animate({
			node : element,
			css : this.options.hidden,
			duration : duration,
			ease : hui.ease.slowFastSlow,
			onComplete : function() {
				onComplete();
				hui.style.set(element,this.options.visible);
			}.bind(this)
		})
	}
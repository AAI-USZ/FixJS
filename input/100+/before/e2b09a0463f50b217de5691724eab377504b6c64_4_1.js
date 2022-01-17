function initSliders(type, contentParent){
		var sliders = contentParent.find("input[type=range]");
		if (sliders.length > 0){
			if (sliders.get(0).type == 'text'){
				//browser don't know 'range' input type, do jQuery fallback.
				jQuery("input[type=range]").slider({
					from: 0, 
					to: 100, 
					step: 1,
					dimension: '%',
					skin: 'plastic',
					onstatechange: function(value){
						var slider = this;
						if(!slider.is.init) return false;
						slider.inputNode.change();
					},
				});
			}
		}
	}
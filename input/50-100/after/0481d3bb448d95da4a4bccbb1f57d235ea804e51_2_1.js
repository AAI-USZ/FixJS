function(options){
			currentSliderIndex = (options && options.sliderIndex) || 0;
			slides = (options && options.slides) || [];
			onMove = (options && options.onMove) || function(){};
			onInsertSlide = (options && options.onInsertSlide)|| function(){};
			onRemoveSlide = (options && options.onRemoveSlide)|| function(){};
				
			rebuildMoveCtrls();
		}
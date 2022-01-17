function($){
	var currentSliderIndex = 0,
		slides = [],
		onMove = function(){},
		onInsertSlide = function(){},
		onRemoveSlide = function(){};
	
	var rebuildMoveCtrls = function(){
		if (currentSliderIndex === 0){
			$('#prevSlide').addClass('icon-plus').addClass('addSlide');
			$('#insertLeft').hide();
		}
		else {
			$('#prevSlide').addClass('icon-chevron-left').removeClass('addSlide').removeClass('icon-plus');
			$('#insertLeft').show();
		}
		
		if (currentSliderIndex === slides.length-1){
			$('#nextSlide').addClass('icon-plus').addClass('addSlide');
			$('#insertRight').hide();
		}
		else {
			$('#nextSlide').addClass('icon-chevron-left').removeClass('addSlide').removeClass('icon-plus');
			$('#insertRight').show();
		}
	};
	
	var insertSlide = function(idx){
		slides.splice(idx, 0, {
			"fields": []
		});
	};
	
	var removeSlide = function(idx){
		slides.splice(idx, 1);
	};
	
	var moveLeft = function(callback){
		Slider.moveLeft(function(idx){
			currentSliderIndex = idx;
			rebuildMoveCtrls();
			if (callback)
				callback();
		});
	};
	
	var moveRight = function(callback){
		Slider.moveRight(function(idx){
			currentSliderIndex = idx;
			rebuildMoveCtrls();
			if (callback)
				callback();
		});
	};
	
	var attachEvents = function(){
		$('#nextSlide').bind('click', function(){
			moveRight(function(){
				onMove();	
			});
		});
		
		$('#prevSlide').bind('click', function(){
			moveLeft(function(){
				onMove();	
			});
		});
		
		$('#insertLeft, #prevSlide.addSlide').live('click', function(){
			insertSlide(currentSliderIndex);
			currentSliderIndex++;
			onInsertSlide();
			moveLeft(function(){
				onMove();	
			});
		});
		
		$('#insertRight, #nextSlide.addSlide').live('click', function(){
			insertSlide(currentSliderIndex+1);
			onInsertSlide();
			moveRight(function(){
				onMove();	
			});
		});
		
		$('#deleteCurrent').live('click', function(){
			
			if (slides.length > 1){
				if (currentSliderIndex === 0){
					moveRight(function(){
						removeSlide(0);
						currentSliderIndex--;
						onRemoveSlide();
						rebuildMoveCtrls();
					});
				}
				else if(currentSliderIndex === slides.length-1) {
					moveLeft(function(){
						removeSlide(currentSliderIndex+1);
						onRemoveSlide();
						rebuildMoveCtrls();
					});
				}
				else {
					moveRight(function(){
						removeSlide(currentSliderIndex-1);
						currentSliderIndex--;
						onRemoveSlide();
						rebuildMoveCtrls();
					});
				}
			}
			else if (slides.length === 1){
				insertSlide(0, slides);
				onInsertSlide();
				removeSlide(currentSliderIndex+1);
				onRemoveSlide();
				rebuildMoveCtrls();
			}
			
		});
	};

	return {
		build: function(done){
			sliderio.view.partials.importToolbox(function(template){
				$('.sliderCtn').append($('#toolbox-tmpl').html());
				done();
			});		
		},
		
		init: function(options){
			currentSliderIndex = (options && options.sliderIndex) || 0;
			slides = (options && options.slides) || [];
			onMove = (options && options.onMove) || function(){};
			onInsertSlide = (options && options.onInsertSlide)|| function(){};
			onRemoveSlide = (options && options.onRemoveSlide)|| function(){};
			
			attachEvents();		
			rebuildMoveCtrls();
		},
		
		currentIndex: function(){
			return currentSliderIndex;
		}
	};
	
	
}
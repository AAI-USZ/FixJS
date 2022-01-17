function(resource){
				ele.attr('data-field-url', resource.file);
				ele.attr('src', 'images/' + resource.file);
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}
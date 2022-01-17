function(resource){
				var img = ele.parents('div.editor-image').children('img.field'); 
				
				ele.attr('data-field-url', resource.file);
				img.attr('data-field-url', resource.file);
				img.attr('src', 'images/' + resource.file);
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}
function(){
			var ele = $(this).parents('.editorField');
			ele.css('text-align', $(this).attr('data-align'));
			
			$('.fTextAlign a.selected', ele).removeClass('selected');
			$(this).addClass('selected');
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		}
function(){
			var ele = $(this).parents('.editorField');
			ele.toggleClass('absoluteField');
			
			if (ele.hasClass('absoluteField'))
				ele.css('width', 'auto');
			else ele.css('position','').css('top','').css('left','');

			hydrateSlide(sliderio.view.toolbox.currentIndex());
			refresh();
		}
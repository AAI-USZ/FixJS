function(e){
			$('.editorField.selected').removeClass('selected').resizable('destroy');
			var ele = $(this);
			ele.addClass('selected').resizable({ 
				maxWidth: $("li.current").width() - (ele.position().left + 20),
				maxHeight: $("li.current").height() - (ele.position().top + 50),
				handles: 'e',
			  stop: function(event, ui) {
			  	hydrateSlide(sliderio.view.toolbox.currentIndex());
			  }
			});
			
			e.stopPropagation();
		}
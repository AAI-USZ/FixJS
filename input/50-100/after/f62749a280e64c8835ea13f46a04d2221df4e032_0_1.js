function(){
			var ele = $(this);
			ele.resizable({ 
				maxWidth: $("li.current").width() - (ele.position().left + 20),
				maxHeight: $("li.current").height() - (ele.position().top + 50),
			  stop: function(event, ui) {
			  	hydrateSlide(sliderio.view.toolbox.currentIndex());
			  }
			});
		}
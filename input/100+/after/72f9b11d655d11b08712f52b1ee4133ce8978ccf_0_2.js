function(){
		$('textarea').attr('rows', 1).css('height', '1em');
		
		Slider.updateList(10);
		
		$(".editorField", "li.current").each(function(){
			if($(this).css("position") === "absolute")
				$(this).addClass("absoluteField");
		});

		$("li.current").sortable({
			revert: true,
			items: '.editorField:not(.absoluteField)',
			update: function(event, ui) {
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}
		}).disableSelection();
		
		$(".absoluteField", "li.current").draggable({
			revert: 'invalid'
		});
		
		$("li.current").droppable({
			accept: ".absoluteField",
			tolerance: "fit",
			drop: function( event, ui ) {
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}
		});
		
		$("#delete-field").droppable({
			activeClass: "active",
			hoverClass: "hover",
			tolerance: "pointer",
			accept: '.editorField',
			drop: function( event, ui ) {
				$(ui.draggable).remove();
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}
		})
		
		$('.fTextAlign', $("li.current")).each(function(){
			var ele = $(this).parents('.editorField');
			var align = ele.css('text-align');
			if(!align) align = 'center';
			$('a.icon-align-' + align, $(this)).addClass('selected'); 
		});
		
		$('textarea', "li.current").each(function(){
				var self = this;
				setTimeout(function(){
					self.style.height = 'auto';
					self.style.height = self.scrollHeight + 'px';
				}, 0);
		}).hide();
	}
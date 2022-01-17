function(event, ui) {
			$(ui.item).bind("mouseup", function() {
				
				open_box(ui.item);
			});
		}
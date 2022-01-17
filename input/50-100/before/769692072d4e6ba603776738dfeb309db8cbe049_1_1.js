function() {
				if ($(this)[0] == element[0]) {
					element.animate({"width": "100%"});
					
					// trigger manual resize event
					element.find('.turtle').trigger('resize');
				} else {
					$(this).animate({"width": "0%"});
				}
			}
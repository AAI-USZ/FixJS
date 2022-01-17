function() {
				if ($(this)[0] == element[0])
					element.animate({"width": "100%"});
				else
					$(this).animate({"width": "0%"});
			}
function(x) {
				var left = navbar.offset().left;
					
				return left <= x && x <= left + navbar.width();
			}
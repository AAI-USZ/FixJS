function() {
				if($(this).find('div').length) return;
				var perc = parseInt($(this).text().split('%')[0]);
				changeOpacity(false, perc);
			}
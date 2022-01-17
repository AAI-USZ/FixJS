function(response) {
			if (response !== undefined) {
				timeout = setTimeout(function () {
					var auxElement = new Element('ul', {'class': 'news-feed'});
					auxElement.set('html', response);
					auxElement.inject($('more-items-container'), 'before');
					var num_top = parseInt($('num').get('value')) + DURATION;
					var num_tot = parseInt($('num_total').get('html'));
					var num_sho;
					$('more_loading').setStyle('display', 'none');
					if (num_top >= num_tot) {
						num_sho = num_tot;
						$$('.more_link').setStyle('display', 'none');
					} else {
						num_sho = num_top;
						$$('.more_link').setStyle('display', 'block');
					}
					$('num').set('value', num_top);
					$('num_showing').set('html', num_sho);
				}, 0);
			}
		}
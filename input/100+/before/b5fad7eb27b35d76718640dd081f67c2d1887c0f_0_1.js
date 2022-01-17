function () {
				var auxElement = new Element('ul', {class: 'news-feed'});
				auxElement.set('html', response);
				auxElement.inject($('more-items-container'), 'before');
				var num_top = parseInt($('num').get('value'));
				var num_tot = parseInt($('num_total').get('html'));
				if (num_top > num_tot) {
					var num_sho = num_tot;
					$('more-items-container').dispose();
				} else {
					var num_sho = num_top;
				}
				$('num').set('value', num_top);
				$('num_showing').set('html', num_sho);
				$('news-container').setStyle('opacity', '1');
			}
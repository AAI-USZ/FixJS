function(response) {
			if (response !== undefined) {
				timeout = setTimeout(function () {
					$('news-container').set('html', response);
					$('news-container').setStyle('opacity', '1');
				}, 0);
			}
		}
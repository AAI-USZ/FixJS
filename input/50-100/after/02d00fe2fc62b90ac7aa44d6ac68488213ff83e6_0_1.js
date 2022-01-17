function () {
			var selector = '.' + name;
			$('.chart:not('+ selector + ')').fadeOut('slow');
			$('.legend:not('+ selector + ')').fadeOut('slow');
			$(selector).addClass('back').fadeIn('fast').removeClass('back');
			if (name === 'treemap') {
				showTreemap(metricName);
			}
			if (name === 'toxicity') {
				showToxicity();
			}
		}
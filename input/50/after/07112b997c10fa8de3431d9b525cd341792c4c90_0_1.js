function() {
			count = $(this).find('tr:visible').length - 1;
			$(this).prev('div.count').html('Listing ' + count + ' entries.');
		}
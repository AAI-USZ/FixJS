function updateCount() {
		count = $('table tr:visible').length - 1;
		$('div.count').html('Listing ' + count + ' entries.');
	}
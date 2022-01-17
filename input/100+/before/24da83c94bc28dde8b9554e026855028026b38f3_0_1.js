function receivePrefixList(search_result) {
	stats.response_received = new Date().getTime();

	if (! ('query_id' in search_result.search_options)) {
		showDialogNotice("Error", 'No query_id');
		return;
	}
	if (parseInt(search_result.search_options.query_id) < parseInt(newest_query)) {
		return;
	}
	newest_query = parseInt(search_result.search_options.query_id);

	// Error?
	if ('error' in search_result) {
		showDialogNotice("Error", search_result.message);
		return;
	}

	/*
	 * Interpretation list
	 */
	var intp_cont = $("#search_interpret_container");
	intp_cont.empty();
	for (key in search_result.interpretation) {

		var interp = search_result.interpretation[key];
		var text = '<b>' + interp.string + ':</b> ' + interp.interpretation;
		var tooltip = '';
		if (interp.interpretation == 'unclosed quote') {
			text += ', please close quote!';
			tooltip = 'This is not a proper search term as it contains an uneven amount of quotes.';
		} else if (interp.attribute == 'prefix' && interp.operator == 'contained_within_equals') {
			text += ' within ';

			if ('strict_prefix' in interp) {
				text += '<b>' + interp.strict_prefix + '</b>';
				tooltip = 'Prefix must be contained within ' + interp.strict_prefix + ', which is the base prefix of ' + interp.expanded + ' (automatically expanded from ' + interp.string + ')';
			} else if ('expanded' in interp) {
				text += '<b>' + interp.expanded + '</b>';
				tooltip = 'Prefix must be contained within ' + interp.expanded + ' (automatically expanded from ' + interp.string + ').';
			} else {
				text += '<b>' + interp.string + '</b>';
				tooltip = 'Prefix must be contained within ' + interp.string;
			}
		} else if (interp.attribute == 'prefix' && interp.operator == 'equals') {
			text += ' equal to <b>' + interp.string + '</b>';
			tooltip = "The " + interp.interpretation + " must equal " + interp.string;
		} else {
			text += " matching '<b>" + interp.string + "</b>'";
			tooltip = "The description OR node OR order id OR the comment should regexp match '" + interp.string + "'";
		}

		intp_cont.append('<div class="search_interpretation tooltip" id="intp' + key + '" title="' + tooltip + '">');
		$('#intp' + key).html(text);
		$('#intp' + key).tipTip({delay: 100});

	}
	stats.draw_intp_finished = new Date().getTime();

	/*
	 * Prefix list
	 */
	// clean up old stuff
	$('#prefix_list').empty();
	prefix_list = new Object();
	indent_head = new Object();

	if (search_result.result.length > 0) {

		// insert prefix list
		insertPrefixList(search_result.result, $("#prefix_list"), search_result.result[0]);

	} else {

		// No prefixes received
		$('#prefix_list').html('<div style="text-align: center; padding: 30px; color: #777777;">No prefixes found.</div>');

	}

	stats.finished = new Date().getTime();

	// Display search statistics
	log('Rendering took ' + (stats.finished - stats.response_received) + ' milliseconds');
	$('#search_stats').html('Query took ' + (stats.response_received - stats.query_sent)/1000 + ' seconds.');

	// less than max_result means we reached the end of the result set
	if (search_result.result.length < search_result.search_options.max_result) {
		end_of_result = 1;
		$('#nextpage').hide();
	} else {
		$('#nextpage').show();
	}
}
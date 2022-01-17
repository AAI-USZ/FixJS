function showStatistics() {
	var statistics = doStatistics();

	var dialog = getDialog(
		$('<div>')
			.append($('<h3></h3>').html(__('Results')))
			.append($('<dl></dl>')
				.append($('<dt>').html(__('Total')))
				.append($('<dd>' + statistics.total + '</dd>'))
				.append($('<dt>').html(__('Valid')))
				.append($('<dd>' + statistics.valid + '</dd>'))
				.append($('<dt>').html(__('Answered')))
				.append($('<dd>' + statistics.answered + '</dd>'))
				.append($('<dt>').html(__('Correct') + " (" + __('valid') + ")"))
				.append($('<dd>' + statistics.correct_valid + '</dd>'))
				.append($('<dt>').html(__('Correct') + " (" + __('invalid') + ")"))
				.append($('<dd>' + statistics.correct_invalid + '</dd>'))
				.append($('<dt>').html(__('Result')))
				.append($('<dd>' + Math.round((statistics.correct_valid/statistics.valid)*100) + ' %</dd>'))
			)
			.append($("<p>").html(__('description questions invalid')))
	);
	$('#container').append(dialog);
	dialog.show();
}
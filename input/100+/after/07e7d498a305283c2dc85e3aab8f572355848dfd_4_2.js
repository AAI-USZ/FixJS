function showStatistics() {
		var statistics = doStatistics();
		$('#dialog-statistics').remove();
		$('<div data-role="dialog" id="dialog-statistics"></div>')
			.append($('<div data-role="header"><h1>' + __('Statistics') + '</h1></div>'))
			.append($('<div data-role="content"></div>')
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
			)
			.appendTo('body')
			.dialog();
		$.mobile.changePage('#dialog-statistics', 'slide-down', true, true);
	}
function showStatistics() {
		var statistics = doStatistics();
		$('#dialog-statistics').remove();
		$('<div data-role="dialog" id="dialog-statistics"></div>')
			.append($('<div data-role="header"><h1>Statistik</h1></div>'))
			.append($('<div data-role="content"></div>')
				.append($('<dl></dl>')
					.append($('<dt>Gesamt</dt>'))
					.append($('<dd>' + statistics.total + '</dd>'))
					.append($('<dt>Gültig</dt>'))
					.append($('<dd>' + statistics.valid + '</dd>'))
					.append($('<dt>Beantwortet</dt>'))
					.append($('<dd>' + statistics.answered + '</dd>'))
					.append($('<dt>Korrekt (gültig)</dt>'))
					.append($('<dd>' + statistics.correct_valid + '</dd>'))
					.append($('<dt>Korrekt (ungültig)</dt>'))
					.append($('<dd>' + statistics.correct_invalid + '</dd>'))
					.append($('<dt>Ergebnis</dt>'))
					.append($('<dd>' + Math.round((statistics.correct_valid/statistics.valid)*100) + ' %</dd>'))
				)
				.append("<p>Ein Frage gilt als <strong>gültig</strong>, wenn es genau <strong>1</strong> als korrekt eingetragene Antwortmöglichkeit gibt. Das Ergebnis berücksichtigt nur gültige Fragen.</p>")
			)
			.appendTo('body')
			.dialog();
		$.mobile.changePage('#dialog-statistics', 'slide-down', true, true);
	}
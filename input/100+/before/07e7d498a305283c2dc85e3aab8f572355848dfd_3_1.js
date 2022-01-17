function showStatistics() {
	var statistics = doStatistics();

	var dialog = getDialog(
		$('<div>')
			.append($('<h3>Ergebnisse</h3>'))
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
	);
	$('#container').append(dialog);
	dialog.show();
}
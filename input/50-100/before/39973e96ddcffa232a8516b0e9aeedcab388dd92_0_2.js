function showStatistics() {
	var s = $('#statistics');
	var time_passed = getTimePassed();
	s.empty();
	s.append($('<dt>Insgesamt</dt><dd>' + questions_total + '</dd>'));
	s.append($('<dt>Korrekt</dt><dd>' + questions_correct + '</dd>'));
	s.append($('<dt>Anteil</dt><dd>' + ((questions_correct/questions_total)*100) + '%</dd>'));
	s.append($('<dt>Zeit</dt><dd>' + time_passed + '</dd>'));
	s.show();
}
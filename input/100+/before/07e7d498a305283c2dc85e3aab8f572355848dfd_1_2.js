function addAnswer(question, json) {
	var qnr = question.attr('data-nr');

	// Die Nummer dieser Antwort ist die Nummer der vorherigen Antwort erhöht
	// um eins
	var prevNr = question.find('.answer:last').attr('data-nr');
	var nr;
	if (prevNr)	// es gibt eine vorige Antwort und sie hat eine Nummer
		nr = parseInt(prevNr) + 1;
	else // Erste Antwort, also Nummer 0
		nr = 0;

	var id = 'answer_' + qnr + '_' + nr;
	var namebase = 'data[Question]['+qnr+'][Answer][' + nr + ']';

	answer_id	= 0;
	answer		= "";
	correct		= false;

	if (json) {
		answer_id= json.id;
		answer = json.answer;
		correct = json.correct;
		if (correct == 'on' || correct==true || correct==1)
			correct = true;
		else
			correct = false;
	}

	var div = $('<div class="answer"></div')
		.attr('id', id)
		.attr('data-nr',nr)
		.append($('<input type="text" />')
			.attr('name', namebase + '[answer]')
			.attr('value', answer)
			.keypress(function(ev) {
				switch (ev.which) {
					case 13:
						addAnswer(question); return false;
				}
			})
			.keydown(function(ev) {
				switch (ev.which) {
					case 8:
						// Wenn das Feld leer ist und Backspace betätigt wird,
						// dann wird die Antwort gelöscht
						if (this.value == "") {
							removeAnswer($(this).parent());
							return false;
						}
						break;
				}
			})
		)
		.append($('<input type="hidden" value="'+answer_id+'" name="'+namebase + '[id]" />'))
		.append($('<input type="checkbox" />')
			.attr('name', namebase + '[correct]')
			.attr('id', id + '_correct')
			.attr('checked', correct)
		)
		.append($('<label>Richtige Antwort</label>')
			.attr('for', id + '_correct'))
		.appendTo(question.children('.answers'));
	div.find('input[type=text]').focus();
}
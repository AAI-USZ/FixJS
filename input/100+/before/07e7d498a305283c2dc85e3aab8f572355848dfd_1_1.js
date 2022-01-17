function addQuestion(json) {
	var prevNr = $('.questions .question:last').attr('data-nr');
	var nr;
	if (prevNr)
		nr = parseInt(prevNr) + 1;
	else
		nr = 0;
	
	var id = "quesion_" + nr;
	var namebase = 'data[Question]['+nr+']';

	var question = "";
	var question_id = 0;
	var attachment = "";
	var answers = null;

	if (json) {
		question_id = json.id;
		question = json.question;
		attachment = json.attachment;
		answers = json.Answer;
	}

	var div = $('<div></div>')
		.attr('id',id)
		.attr('data-nr',nr)
		.addClass('question input')
		.append($('<textarea>'+question+'</textarea>')
			.attr('name',namebase + '[question]')
			.attr('placeholder', 'Fragestellung')
			.keydown(function(ev) {
				switch (ev.which) {
					case 8:
						// Wenn das Feld leer ist und Backspace betätigt wird,
						// dann wird die Frage gelöscht
						if (this.value == "" && confirm('Frage löschen?')) {
							removeQuestion($(this).parent());
							return false;
						}
						break;
				}
			})
		)
		.append($('<textarea>'+attachment+'</textarea>')
			.attr('name', namebase + '[attachment]')
			.attr('placeholder', 'Anhang (z.b. ein Bild oder eine Tabelle)')
		)
		.append($('<input type="hidden" value="'+question_id+'" name="'+namebase + '[id]" />'))
		.append($('<div class="answers"></div>'))
		.appendTo($('div.questions'))
		.append($('<button>Antwort hinzufügen</button>')
			.click(function() {
				addAnswer($(this).parent());
				return false;
			})
		);
	div.find('textarea:first').focus();

	if (answers && answers.length > 0) {
		$(answers).each(function(i,answer) {
			addAnswer(div, answer);
		});
	}
}
function buildIndex() {
		$('#question-index').remove();
		$("body").append($("<div data-role='page' id='question-index'></div>")
			.append($("<div data-role='header'></div>")
				.append($("<h1>").text(__('Questions')))
			)
			.append($("<div data-role='content'></div>")
				.append($("<ul data-role='listview' id='question-index-list'></ul>"))
			)
		);
		var qi = $('#question-index');
		var qil = $('#question-index-list');
		$(exam.Question).each(function(idx, question) {
			var li = $("<li></li>")
				.append($('<a></a>')
					.click(function() {
						$.mobile.changePage('#page-main');
						showQuestion(idx);
					})
					.text((idx+1) + ". " + question.question)
				)
				.attr('id', 'question-index-list-' + idx)
				.appendTo(qil)
			;
			if (question.answered) {
				li.addClass('answered');
			}
		});
		qil.trigger('create');
	}
function addQuestion(index, target) {
	var question = exam.Question[index];
	var answers = $('<fieldset class="answers"></fieldset>');
	var comments = $('<div class="comments"></div>');
	var materials = $('<div class="materials"></div>');

	$(question.Answer).each(function(idx, ans) {
		var checked = "notchecked";
		if (ans.checked)
			checked = "checked";

		var comments = $('<div class="comments"></div>');
		$(ans.Comment).each(function(idx2, comment) {
			examAddComment(comment, comments)
		});

		var answer = $('<div class="answer"></div>')
			.attr('data-id', ans.id)
			.attr('id', 'answer_' + ans.id + '_div')
			.append($('<input type="radio" />')
				.attr('name', 'question_' + question.id)
				.attr('id', 'answer_' + ans.id)
				.click(function(e) {
					questionSetAnswer(index, idx);
				})
				.attr(checked, checked)
			)
			.append($('<label></label>')
				.attr('for', 'answer_' + ans.id)
				.append($('<a>Kommentieren</a>')
					.addClass('btn-add-comment')
					.click(function() { showCommentField(comments); })
				)
				.append(ans.answer)
			)
		;
		answer.append(comments);
		answers.append(answer);
	});

	$(question.Comment).each(function (idx, comment) {
		examAddComment(comment, comments);
	});



	$(question.Material).each(function (idx, material) {
		examAddMaterial(material, materials);
	});

	$('<div class="question"></div>')
		.attr('data-id', question.id)
		.attr('id','question_' + question.id)
		.append($('<p class="question-text"></p>')
			.text((index+1) + ". " + question.question)
		)
		.append($('<p class="attachment"></p>')
			.html(question.attachment)
		)
		.append($('<a></a>')
			.text('Lösung')
			.click(function() { showSolution(index); })
			.addClass('button btn-show-solution')
		)
		.append($('<a></a>')
			.append($('<img src="/fragenkatalog/img/editor.gif"></img>')
				.attr('title','Frage bearbeiten')
			)
			.attr('title','Frage bearbeiten')
			.attr('href','/fragenkatalog/questions/edit/' + question.id)
			.attr('target', '_blank')
			.addClass('button btn-edit-question')
		)
		.addClass((question.valid) ? "valid" : "invalid")
		.append(answers)
		.append($('<a>Frage Kommentieren</a>')
			.addClass('btn-add-comment')
			.click(function() { showCommentField(comments); })
		)
		.append(comments)
		.append(materials)
		.click(function(e) {
			if (currentQuestionIndex != index)
				showQuestion(index);
		})
	.appendTo(target);
}
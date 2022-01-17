function(idx, ans) {
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
				.append($('<a>')
					.text(__('comment'))
					.addClass('btn-add-comment')
					.click(function() { showCommentField(comments); })
				)
				.append(ans.answer)
			)
		;
		answer.append(comments);
		answers.append(answer);
	}
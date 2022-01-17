function submitComment() {
	var field = $('#comment-field');
	deactivateElement(field);
	if (field.parents('.answer').get().length > 0) {
		var par = field.parents('.answer');
		$.ajax({
			url : '/fragenkatalog/answers_comments/add.json',
			type: 'POST',
			data: {
				'AnswersComment' : {
					'answer_id' : par.attr('data-id'),
				},
				'Comment' : {
					'comment' : field.find('textarea').val()
				}
			},
			success: function(data) {
				onCommentSubmitted(data,par.find('.comments'));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (jqXHR.status == 403) {
					alert(__('info session expired'));
					location.reload();
				}
			}
		});
	} else if (field.parents('.question').get().length > 0) {
		var par = field.parents('.question');
		$.ajax({
			url : '/fragenkatalog/questions_comments/add.json',
			type: 'POST',
			data: {
				'QuestionsComment' : {
					'question_id' : par.attr('data-id'),
				},
				'Comment' : {
					'comment' : field.find('textarea').val()
				}
			},
			success: function(data) {
				onCommentSubmitted(data,par.children('.comments'));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (jqXHR.status == 403) {
					alert(__('info session expired'));
					location.reload();
				}
			}
		});
	} else {
		alert(__('Something is wrong'));
		reactivateElement(field);
	}
}
function (event) {
		var title = $('#new_question_title').val();
		var body = $('#new_question_body').val();
		if (title && body) {
			rqra.createQuestion(title, body, function (data) {
				if (data) {
					if (data.errorcode === 0) {
						$('#error').text('OK OK REFRESH NOW');
					}

				}

				else {
					$('#error').text('CANNOT CONNECT TO DATABASE');


				}

			})


		}

	}
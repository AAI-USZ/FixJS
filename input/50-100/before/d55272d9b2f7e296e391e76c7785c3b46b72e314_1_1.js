function (questionTitle, questionBody, callback) {
			console.log("API - createQuestion");

			var body = {};
			var question = {};

			question.body = questionBody;
			question.category = 'testcategory'; //TODO need replaced
			question.title = questionTitle;
			body.question = question;


			$.ajax({
				url:'/api/question',
				type:'POST',
				dataType:'json',
				contentType:"application/json",
				data:JSON.stringify(body),
				success:function (data) {
					callback(data);

				}

			})

		}
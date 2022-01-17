function (id, questionTitle, questionBody, callback) {
			console.log("API - updateQuestionById");
			var body = {};
			body.title= questionTitle;
			body.body = questionBody;
			$.ajax({
				url:'/api/question/' + id,
				type:'PUT',
				dataType:'json',
				contentType:"application/json",
				data:JSON.stringify(body),
				success:function (data) {
					callback(data);
				}
			});
		}
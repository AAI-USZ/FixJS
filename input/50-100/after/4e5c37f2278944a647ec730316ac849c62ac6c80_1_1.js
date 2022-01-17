function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.question.user === userUid &&
						body.question.title === updatedQuestionTitle &&
						body.question.body === updatedQuestionBody);
					test.done();
				}
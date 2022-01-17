function() {
					body = JSON.parse(body);
					test.ok(body.errorcode === 0 &&
						body.question.user === userUid &&
						body.question.title === updatedQuestionBody);
					test.done();
				}
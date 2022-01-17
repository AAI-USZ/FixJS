function (index, item) {

							var content = '<li class="questions_li">'
								+ '<p>_id: ' + item._id + '</p>'
								+ '<p>title: ' + item._source.title + '</p>'
								+ '<p>body: ' + item._source.body + '</p>'
								+ '<p>category: ' + item._source.category + '</p>'
								+ '<p>status: ' + item._source.status + '</p>'
								+ '<p>timestamp: ' + item._source.timestamp + '</p>'
								+ '<p>user: ' + item._source.user + '</p>'
								+ '</li>';
							$('#user_questions').append(content);
						}
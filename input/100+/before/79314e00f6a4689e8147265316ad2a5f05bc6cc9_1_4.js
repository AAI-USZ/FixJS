function (data) {
				if (data) {
					console.log(data);
					$('#user_comments').empty();
					if (data.errorcode === 0 && data.comments.length > 0) {

						$.each(data.comments, function (index, item) {
							console.log(item);
							var content = '<li class="comments_li">'
								+ '<p>_id: ' + item._id + '</p>'
								+ '<p>body: ' + item._source.body + '</p>'
								+ '<p>downvote: ' + item._source.downvote + '</p>'
								+ '<p>isAnswered: ' + item._source.isAnswered + '</p>'
								+ '<p>objectType: ' + item._source.objectType + '</p>'
								+ '<p>target_uuid: ' + item._source.target_uuid + '</p>'
								+ '<p>timestamp: ' + item._source.timestamp + '</p>'
								+ '<p>title: ' + item._source.title + '</p>'
								+ '<p>upvote: ' + item._source.upvote + '</p>'
								+ '<p>user: ' + item._source.user + '</p>'
								+ '</li>';
							console.log(content);
							$('#user_comments').append(content);
						});
					}
					else {
						alert(data.message);
					}

				}
				else {
					alert('CANNOT CONNECT TO DATABASE');
				}
			}
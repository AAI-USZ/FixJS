function (index, item) {

							var content = '<li class="questions_li">'
								+ '<p>' + item._id + '</p>'
								+ '<p>' + item._source.body + '</p>'
								+ '<p>' + item._source.category + '</p>'
								+ '<p>' + item._source.status + '</p>'
								+ '<p>' + item._source.timestamp + '</p>'
								+ '<p>' + item._source.title + '</p>'
								+ '<p>' + item._source.user + '</p>'
								+ '</li>';
							$('#search_results').append(content);
						}
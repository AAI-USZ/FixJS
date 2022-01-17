function(comments, length){					
					var json_comments = JSON.stringify(comments);
					res.render('board/show', {
						title : 'Show Contents',
						board : docs,
						board_id : board_id,
						comment : json_comments,
						length : length,
						sessionId : sessionId
						, session: req.session.user
					});//end of render
				}
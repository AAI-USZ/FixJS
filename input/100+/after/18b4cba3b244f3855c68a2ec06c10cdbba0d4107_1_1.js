function(req, res) {
		var model = db.get_model();
		var comment = require('../comment/comment'); 
			
		var board_id = req.params.id;
		var board_index = req.params.num;
		var sessionId = "";
		if(req.session.user)
			sessionId = req.session.user.Id;
		
		model.findOne({index : board_index, board_id : board_id}, function(err, docs){
			if ( !err ) {
				comment.list(req, res, function(comments, length){					
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
				});//end of comment list
			}//end of if
			else {
				console.log('in show_contets : error(01)');
			}//end of else 
		});//end of findOne
	}
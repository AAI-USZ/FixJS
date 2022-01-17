function(req, res) {
		db.connect();
		var make_model = db.make_model();
		var find_model = db.get_model();
		
		var board_id = req.body.board_id;
		var post_index = req.body.board_index;
		var password = "";
		var content = req.body.commentForm;
		
		var user_id = req.session.user.Id;
		var user_name = req.session.user.name;
			
		var index = 1;
		
		var board = require('../board/board');
		
		find_model.findOne().sort('index',-1).exec(function(err, docs){
			if ( !err ) {
				if ( docs )
					index = docs.index + 1;
				
				make_model.board_id = board_id;
				make_model.post_index = post_index;
				make_model.password = password;
				make_model.content = content;
				make_model.user_id = user_id;
				make_model.user_name = user_name;
				make_model.index = index;
				make_model.insert_date = new Date();
				make_model.udpate_date = new Date();
				make_model.deleted = false;
				
				make_model.save(function(err){
					if ( !err ) {
						console.log('in comment/write.js : insert success');
					}
					else {
						console.log('in comment/write.js : insert fail');
					}
					
					board.increase_hit(post_index, -1, function(result){
						if ( true == result ) {
							res.redirect('/board/' + board_id + '/' + post_index);	
						}
						else {
							console.log('in comment.js _ insert : error');	
						}						
					});//end of board_increase_hit
				});//end of save
			}//end of if
			else {
				console.log('in comment/write.js : error(01)');
			}//end of else
		});//end of findOne
	}
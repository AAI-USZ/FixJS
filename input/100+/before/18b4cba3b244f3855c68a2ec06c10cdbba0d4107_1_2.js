function(err, board){		
			if ( !err && board ) {
				var current_page = req.query.page || 1;
				var type = req.query.type || "";
				var content = req.query.content || "";
								
				var title = board.name || "";
				var paging_size = board.paging; 
						
				var skip_size = (current_page * paging_size) - paging_size;
				
				var session_id = req.session.user.Id;
				
				var search_reg_exp = new RegExp(content);
									
				if ( 'id' === type ) {
					model.find({notice : false, deleted : false, user_id : search_reg_exp, board_id : board_id})
						.sort('insert_date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
							if ( !err ) {
								model.count({notice : false, deleted : false, user_id : search_reg_exp, board_id : board_id}, function(err, length){
									self.display_result(req, res, board_id, title, docs, current_page, paging_size, length, session_id, type, content, notice);
								});//end of count
							}//end of if
							else {
								console.log('in view.js : error (02)');
							}//end of else
					});//end of find
				}//end of if
				else if ( 'name' === type ) {
					model.find({notice : false, deleted : false, user_name : search_reg_exp, board_id : board_id})
						.sort('insert_date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
							if ( !err ) {
								model.count({notice : false, deleted : false, user_name : search_reg_exp, board_id : board_id}, function(err, length){
									self.display_result(req, res, board_id, title, docs, current_page, paging_size, length, session_id, type, content, notice);
								});//end of count
							}//end of if
							else {
								console.log('in view.js : error (03)');
							}//end of else
					});//end of find
				}//end of else if
				else if ( 'subject' === type ) {
					model.find({notice : false, deleted : false, subject : search_reg_exp, board_id : board_id})
						.sort('insert_date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
							if ( !err ) {
								model.count({notice : false, deleted : false, subject : search_reg_exp, board_id : board_id}, function(err, length){
									self.display_result(req, res, board_id, title, docs, current_page, paging_size, length, session_id, type, content, notice);
								});//end of count
							}//end of if
							else {
								console.log('in view.js : error (04)');
							}//end of else
					});//end of find
				}//end of else if
				else if ( 'content' === type ) {
					model.find({notice : false, deleted : false, content : search_reg_exp, board_id : board_id})
						.sort('insert_date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
							if ( !err ) {
								model.count({notice : false, deleted : false, content : search_reg_exp, board_id : board_id}, function(err, length){
									self.display_result(req, res, board_id, title, docs, current_page, paging_size, length, session_id, type, content, notice);
								});//end of count
							}//end of if
							else {
								console.log('in view.js : error (05)');
							}//end of else
					});//end of find
				}//end of else if
				else {
					model.find({notice : false, deleted : false, board_id : board_id})
						.sort('insert_date', -1).skip(skip_size).limit(paging_size).exec(function(err, docs){
							if ( !err ) {
								model.count({notice : false, deleted : false, board_id : board_id}, function(err, length){
									self.display_result(req, res, board_id, title, docs, current_page, paging_size, length, session_id, type, content, notice);
								});//end of count
							}//end of if
							else {
								console.log('in view.js : error (06)');
							}//end of else
					});//end of find
				}//end of else
			}//end of if
			else {
				console.log('in view.js : error(01)');
			}//end of else
		}
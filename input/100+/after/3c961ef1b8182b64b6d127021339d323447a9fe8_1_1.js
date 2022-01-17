function(req, res) {
		var db = require('../Database/board/board_list_db');
		db.connect();
		var model = db.get_model();
		var id = req.params.id;
		
		model.findOne( {id : id}, function(err, docs) {
			if(!err ) {
				res.render('admin/board_modify_view', {
					title : 'board_modify'
					, docs : docs
					, session: req.session.user
				});//need render
			}//end of if
			else {
				console.log('in admin.js, modify_view : error(01)');
			}//end of else
		});//end of findOne
	}
function(req, res) {
		var db = require('../Database/board/board_list_db');
		db.connect();
		var model = db.get_model();
		var id  = req.params.id;
		var name = req.body.name;
		var paging_size = req.body.paging;
		var condition = { id : id };
		var update = { $set : {
							name : name,
							paging : paging_size,
							update_date : new Date()
						}};//end of update-state
		model.update(condition, update, null, function(err) {
			if(!err) {
				console.log ('in admin.js, board_update : success');
				var alert_script = alert.AlertRedirect("수정되었습니다.", '/admin/main');
				res.render('alert', {
					title : "Success"
					, alert : alert_script
				});//need render or redirect
			}//end of if
			else{
				console.log ('in admin.js, board_update : err(01)');
			}//end of else
		});//end of update
	}
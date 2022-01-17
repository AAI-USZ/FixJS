function(err) {
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
		}
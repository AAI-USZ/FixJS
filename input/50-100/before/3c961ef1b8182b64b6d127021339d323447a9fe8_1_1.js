function(err, docs) {
			if(!err ) {
				res.render('admin/board_modify_view', {
					title : 'board_modify'
					, docs : docs
				});//need render
			}//end of if
			else {
				console.log('in admin.js, modify_view : error(01)');
			}//end of else
		}
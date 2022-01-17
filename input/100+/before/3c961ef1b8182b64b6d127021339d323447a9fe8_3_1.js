function(req, res, callback) {
		db.connect();
		var model = db.get_model();
		var post_index = req.params.num;
		
		var current_page = req.params.comm_page || 1;
		var paging_size = 10;
		var skip_size = (paging_size * current_page) - paging_size;
		
		model.count({deleted : false, post_index : post_index}, function(err, counter) {
			if ( !err ) {
				model.find({deleted : false, post_index : post_index}).sort('insert_date', -1)
					.skip(skip_size).limit(paging_size).exec( function(err, docs){
					if ( !err ) {
						callback(docs, counter/paging_size);
					}//end of if
					else {
						console.log('in comment/view.js : error(01)');
						callback(null, null);
					}//end of else
				});//end of find
			}//end of if
			else {
				console.log('in comment/view.js : error (02)');
			}
		});//end of count	
	}
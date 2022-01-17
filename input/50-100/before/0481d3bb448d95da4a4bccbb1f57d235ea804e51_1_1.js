function(data, err){
			if (err && err !== "success"){
				sliderio.view.status.error();
			}
			else {
				sliderio.view.status.success('Saved');
				if (callback) callback();
			}
		}
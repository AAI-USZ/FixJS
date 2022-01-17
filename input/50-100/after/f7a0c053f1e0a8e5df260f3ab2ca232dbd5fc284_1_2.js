function(err, state){
			 if(err) return cb(err);
			 
			 if(!state || (state == 'complete') || (state == 'removed')) {
				 // Verify the job has been removed
				 client.srem('q:after:' + id, self.id, function(err, cnt){
					 if(err || !cnt) return cb(err);
					 client.hincrby('q:job:' + self.id, 'after', -1, cb);
				 });
			 }
			 else cb();
		 }
function(err, cnt){
					 if(err || !cnt) return cb(err);
					 client.hincrby('q:job:' + self.id, 'after', -1, cb(err));
				 }
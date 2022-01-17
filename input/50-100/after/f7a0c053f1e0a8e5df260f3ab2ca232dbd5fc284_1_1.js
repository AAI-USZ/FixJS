function(err){
			if(err) console.log('error: attach failed', err);
			remaining--;
			if(!remaining){
				client.hget('q:job:' + self.id, 'after', function(err, val){
					if(err) return cb(err);
					self._after = val;
					cb(err, self);
				});
			}
		}
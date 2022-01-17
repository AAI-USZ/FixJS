function(err, job){
		  if(err || !job){
			  // Bad news: couldn't give them the lock for some reason: try again
			  client.del('q:lockowners:' + self._group, function(err){
			    if(err) return;
				self.acquire();
			  });
			  return;
		  }
		  
		  // The job now has the lock
		  client.zrem('q:staged:' + job._group, job.id, noop);
		  job.inactive();
		}
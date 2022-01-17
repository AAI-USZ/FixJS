function(err, job){
		  if(err || !job){
			  // Bad news: couldn't give them the lock for some reason
			  // (they were probably deleted) - clean up and try again
			  
			  client.zrem('q:staged:' + self._group, groups[0], function(){
				  client.del('q:lockowners:' + self._group, function(err){
				    if(err) return;
					self.acquire();
				  });				  
			  });
			  
			  return;
		  }
		  
		  // The job now has the lock
		  client.zrem('q:staged:' + job._group, job.id, noop);
		  job.inactive();
		}
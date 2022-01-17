function(){
  var self = this;
  var client = self.client;

  // Release dependents
  client.scard('q:after:' + self.id, function(err, len) {
	if(err || !len) return;
	while(len--){
	  client.spop('q:after:' + self.id, function(err, id){
		  if(err || !id) return;
		  client.hincrby('q:job:' + id, 'after', -1, function(err, val){
			  if(err || val) return;
			  Job.get(id, function(err, job){
				if(err || !job) return;
				job.waiting();
			  });
		  });
	  });
	}
  });	

  if(!self._group) return this;

  // Make sure the job is no longer in the staging area (if being deleted)
  client.zrem('q:staged:' + self._group, self.id, noop);

  // Give lock to next job in group
  client.get('q:lockowners:' + self._group, function(err, id){
	  if(err || (id != self.id)) return;
	  client.del('q:lockowners:' + self._group, function(err){
	    if(err) return;
	    // Give the lock to someone else (since we're not in the list, we can't get it)
	    self.acquire();
	  });
  });
  
  return this;
}
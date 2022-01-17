function(err, old){
	  if(err || (old == state)) return; // we're already in the state or an error occurred
	  self.removeState(old);
	  self._state = state;
	  if ('active' == state) self.heartbeat();
	  if (('complete' == state) || ('removed' == state)) self.release();

	  if('removed' != state){
		  self.set('state', state);
		  client.zadd('q:jobs', self._priority, self.id, noop);
		  client.zadd('q:jobs:' + state, self._priority, self.id, noop);
		  client.zadd('q:jobs:' + self.type + ':' + state, self._priority, self.id, noop);
		  // increase available jobs, used by Worker#getJob()
		  if ('inactive' == state) client.lpush('q:' + self.type + ':jobs', 1);	
		  if ('staged' == state){
			client.zadd('q:staged:' + self._group, self._priority, self.id, noop);
			self.acquire();
		  }
		  if ('waiting' == state){
			  self.attachAll(function(err){ if(!self._after) self.staged(); });
		  }
	  }
  }
function(err){
				  if(err) console.log('error: attachAll failed', err);
				  if(!self._after) self.staged();
				 }
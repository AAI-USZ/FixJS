function(err, doc){
          if(err){
            em.emit('error', err);
          }else{
            em.emit('data', null, doc);
          }
          self.resume();
        }
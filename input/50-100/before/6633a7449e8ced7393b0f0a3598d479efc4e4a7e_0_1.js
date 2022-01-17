function(doc){
      var self = this;
      self.pause();
      doc.save(function(){
        doc.on('es-indexed', function(err, doc){
          if(err){
            em.emit('error', err);
          }else{
            em.emit('data', null, doc);
          }
          self.resume();
        });
      });
    }
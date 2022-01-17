function(doc){
      var self = this
        , _data = doc
      self.pause();
      doc.save(function(){
        doc.on('es-indexed', function(err, doc){
          if(err){
            em.emit('error', err);
          }else{
            em.emit('data', null, doc, _data);
          }
          self.resume();
        });
      });
    }
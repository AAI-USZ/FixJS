function(emitter) {
    var self = this
    emitter
      .success(function(){
        self.finishedEmits++
        finish.call(self)
      })
      .error(function(err){
        self.finishedEmits++
        self.fails.push(err)
        finish.call(self)
      })
      .on('sql', function(sql){ self.eventEmitter.emit('sql', sql) })
  }
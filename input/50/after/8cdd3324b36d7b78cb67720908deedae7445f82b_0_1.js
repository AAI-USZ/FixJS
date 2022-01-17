function(emitter) {
      if(Array.isArray(emitter)) {
        self.add.apply(self, emitter)
      } else {
        self.add(emitter)
      }
    }
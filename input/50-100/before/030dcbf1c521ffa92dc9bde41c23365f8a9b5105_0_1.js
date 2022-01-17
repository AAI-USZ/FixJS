function() {
  this.running = true;

  // XXX REMOVE ME
  //this.PC = this.read_word(0xFFFC)

  var self = this;
  this.loop_id = setInterval(function() {
    var cycles = self.cycles;
    while (self.cycles < cycles + 10000) {
      self.run(self._read_memory(self.PC++));
    }

    self.draw();

    if (!self.running) {
      clearInterval(self.loop_id);
    }
  },20);
}
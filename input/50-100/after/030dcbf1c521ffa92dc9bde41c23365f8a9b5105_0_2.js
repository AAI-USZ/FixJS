function() {
  var stack_top = 0x01FF;
  var mem = [];

  for (var i = 0x0100 + this.SP + 1; i <= stack_top; i++) {
    mem.push({
                address : i,
                word : parseInt(this.read_memory(i), 16)
              });
  }

  return mem;
}
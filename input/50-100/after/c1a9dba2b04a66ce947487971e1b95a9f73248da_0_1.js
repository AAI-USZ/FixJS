function() {
  this.running = true;

  this.run(this._read_memory(this.PC++));
  this.draw();

  this.running = false;
}
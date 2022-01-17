function(config) {
  // Check if it is virgin mode
  if (config.master.cert === '') {
    this.state = global.states[0];
    this.mode = global.modes[0]; // peer mode
  } else {
    this.state = global.states[0];
    this.mode = global.modes[1]; // hub mode
  }
  
  log("INFO", "PZP is in mode " + this.mode);
}
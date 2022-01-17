function() {
  if ( this.isOn || this.isRunning ) {
    this.off();
  } else {
    this.on();
  }

  return this;
}
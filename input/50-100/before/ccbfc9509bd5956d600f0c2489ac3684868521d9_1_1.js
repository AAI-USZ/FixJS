function() {
    var i, l, buffer = this.logBuffer;
    console.log(buffer.join('\n') + '\n\n' +
        'success: ' + this.countSuccess +
        ', failed: ' + this.countFailed +
        ', total: ' + (this.countSuccess + this.countFailed));
    return this;
  }
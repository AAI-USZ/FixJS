function() {
    var i, l, buffer = this.logBuffer;
    console.log(buffer.join('\n') + '\n\n' +
        'success | ' + this.countSuccess + '\n' +
        'failed  | ' + this.countFailed + '\n' +
        'total   | ' + (this.countSuccess + this.countFailed));
    return this;
  }
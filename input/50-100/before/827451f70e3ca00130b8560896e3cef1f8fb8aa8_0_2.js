function() {
  if (this.message) {
    return this.name + ':' + this.message
  } else {
    return this.name + ':' +
      this.truncate(JSON.stringify(this.actual), 128) + " " +
      this.operator + " " +
      this.truncate(JSON.stringify(this.expected), 128) 
  }
}
function() {
  debug('Handle event packet')
  var args = this.readArgs();
  if (!args) {
    return;
  }

  this.client.$emit.apply(this.client, args);
}
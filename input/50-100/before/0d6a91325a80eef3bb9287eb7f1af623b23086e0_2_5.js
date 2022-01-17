function() {
  this.client.log.debug('Handle message packet');
  var args = this.readArgs();
  if (!args) {
    return;
  }

  args.unshift('message');
  this.client.$emit.apply(this, args);
}
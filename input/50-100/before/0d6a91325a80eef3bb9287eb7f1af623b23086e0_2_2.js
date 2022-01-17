function() {
  this.client.log.debug('Handle error packet');
  var args = this.readArgs();
  if (!args) {
    return;
  }

  args.unshift('error');
  this.client.$emit.apply(this.client, args);
}
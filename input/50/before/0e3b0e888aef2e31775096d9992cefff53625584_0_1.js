function(target){
  this.log.info('Purge Cache');
  for(var i in this.purge_callbacks){
    this.purge_callbacks[i].call(this, target);
  }
}
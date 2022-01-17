function() {
  if(!this.model.getCamera()) return 0;
  return  this.model.getCamera().getZ();
}
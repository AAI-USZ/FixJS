function() {
  if(!this.currentCamera) return 0;
  return  this.currentCamera.getZ();
}
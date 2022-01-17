function() {
  var 
  width = this.domRoot.innerWidth(),
  height = this.domRoot.innerHeight(),
  factor = Ori.gfxProfile.resolution;
  this.currentCamera.setAspect(width / height);
  this.canvas.setSize(width*factor, height*factor);
}
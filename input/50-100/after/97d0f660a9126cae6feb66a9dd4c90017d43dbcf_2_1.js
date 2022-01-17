function() {
  var 
  width = this.domRoot.innerWidth(),
  height = this.domRoot.innerHeight(),
  factor = Ori.gfxProfile.resolution;
  this.canvas.setSize(width*factor, height*factor);
  if(this.model) 
    this.model.getCamera().setAspect(width / height);
}
function (progress, isWeak) {
  if (progress > 1) {
    progress = 1;
  } else if (progress < 0) {
    progress = 0;
  }
  this.progress = progress;
  
  
  
  if (this.allowWeakProgress || !weak) {
    this.previousTime = new Date();
    
    this.currentTime = new Date();

    var weak = isWeak || false;
  
    for (var defaultValue in this.defaultValues) {
      this.defaultValues[defaultValue].activate(this.progress);
    }
    
    for (var animation in this.animations) {
      this.animations[animation].activate(this.progress);
    }
    
    for (var controller in this.controllers) {
      this.controllers[controller].update(this.progress);
    }
    
    this.currentTime = new Date();
    this.stepSize = Math.max(this.currentTime - this.previousTime, this.stepSize);
  }
  
  
}
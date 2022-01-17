function(time) {
  this.canvas.render(this.currentScene, this.currentCamera);
  this.updateInfoBox();
  this.updateLabels();        
//  this.stats.update();
}
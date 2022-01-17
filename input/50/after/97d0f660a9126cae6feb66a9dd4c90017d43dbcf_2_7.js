function(time) {
  this.canvas.render(this.currentScene, this.model.getCamera() );
  this.updateInfoBox();
  this.updateLabels();        
//  this.stats.update();
}
function() {
  this.context.save();
  this.fade1 = this.fade1+(0.010*this.alpha);
  if(this.fade1 >= 0.6)
    this.alpha = -1;
  else if(this.fade1 <= 0.2)
    this.alpha = 1;
  this.context.fillStyle = "rgba(255, 255, 255, "+this.fade1+")";
  this.context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  this.context.lineWidth = 2;
  this.context.font = "bold "+this.font_size+"px Arial";
  this.context.textBaseline = 'top';
  this.context.textAlign = 'left';
  this.context.strokeText(this.puzzle.remaining_time, 10, 40);
  this.context.fillText(this.puzzle.remaining_time, 10, 40);
  var metrics = this.context.measureText(this.stage+"/"+this.puzzles.length+" ");
  this.context.strokeText(this.stage+"/"+this.puzzles.length, this.canvas.width/this.scale-metrics.width, 40);
  this.context.fillText(this.stage+"/"+this.puzzles.length, this.canvas.width/this.scale-metrics.width, 40);
  this.context.restore();
}
function() {
  var curTime = goog.now();
  var timeDiff = Math.floor(dotprod.Timer.millisToTicks(curTime - this.lastTime_ + this.tickResidue_));

  timeDiff = Math.min(timeDiff, dotprod.Game.MAX_TICKS_PER_FRAME_);

  for (var i = 0; i < timeDiff; ++i) {
    for (var j = 0; j < this.layers_.length; ++j) {
      this.layers_[j].update();
    }
  }

  this.canvas_.width = window.innerWidth - this.canvas_.offsetLeft * 2;
  this.canvas_.height = window.innerHeight - this.canvas_.offsetTop - 48;

  var context = this.camera_.getContext();
  context.save();
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.canvas_.width, this.canvas_.height);
    for (var i = 0; i < this.layers_.length; ++i) {
      this.layers_[i].render(this.camera_);
    }
  context.restore();

  this.debugView_.update();

  this.tickResidue_ += curTime - this.lastTime_;
  this.tickResidue_ -= dotprod.Timer.ticksToMillis(timeDiff);
  this.lastTime_ = curTime;
}
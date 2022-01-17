function() {
  
    var time = this.timer.tick();
    this.elapsedTime += time;
//    if(this.elapsedTime >= this.targetTime) {
      this.runningSlow = false;
      if(time >= this.targetTime) {
        this.runningSlow = true;
      }
      this.update(time);
//      if(!this.runningSlow)
        this.draw(time);

//      this.elapsedTime = 0;
//    }
    Ori.input.reset();
  }
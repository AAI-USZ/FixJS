function(interval) {
    if(!interval) interval = 1;
    
    var currentTime = this.time,
        newTime = currentTime;
    newTime.second = currentTime.second + interval;
    
    if(newTime.second >= 60) {
      newTime.minute += Math.floor(newTime.second / 60);
      newTime.second = newTime.second % 60;
    }
    if(newTime.minute >= 60) {
      newTime.hour += Math.floor(newTime.minute / 60);
      newTime.minute = newTime.minute % 60;
    }
    
    this.setTime(newTime.hour, newTime.minute, newTime.second);
  }
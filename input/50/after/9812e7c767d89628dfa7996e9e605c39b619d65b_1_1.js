function Animation() {
    this.uid = ++uid;
    this.clips = [];
    this.timePoint = 0;
    this.status = START_POINT;
    this.duration = 0;
  }
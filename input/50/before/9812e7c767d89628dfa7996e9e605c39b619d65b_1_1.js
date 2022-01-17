function Animation() {
    this.uid = ++uid;
    this.clips = [];
    this.timePoint = 0;
    this.status = STARTING_POINT;
    this.duration = 0;
  }
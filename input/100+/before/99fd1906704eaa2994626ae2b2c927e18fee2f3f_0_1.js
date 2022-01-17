function () {
    if (this.currentTime() > this.endtime - 0.5) {
      this.pause(this.endtime - 0.5);
    }
    var fulldur = timeline.endtime;
    var totalwidth = $("#maintimeline").width();
    var pct = this.currentTime() / fulldur * 100; // for when we switch to % for window size adjustments
    var newoffset = totalwidth * this.currentTime() / fulldur;
    $(".timeloc").text(sec2hms(this.currentTime()));
    $("#timepos").css('left', pct + "%");

  }
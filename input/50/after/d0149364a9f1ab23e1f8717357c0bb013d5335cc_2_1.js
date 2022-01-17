function(options) {
    if (!_.isObject(options.liveStreamEl)) {
      $("#region-footer").append('<audio id="background-audio" src="http://kexp-mp3-2.cac.washington.edu:8000/;" preload="none">');
      options.liveStreamEl = document.getElementById("background-audio");
    }
  }
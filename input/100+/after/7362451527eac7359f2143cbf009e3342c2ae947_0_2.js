function () {
    if (typeof $ZAP_AUDIO_CHANNELS !== "number") {
      return;
    }
    var channels = [];
    for (var i = 0; i < $ZAP_AUDIO_CHANNELS; ++i) {
      channels[i] = new Audio();
      channels[i]._done = -1;
    }
    return function (id, volume) {
      var sound = document.getElementById(id);
      if (volume >= 0 && volume <= 1) {
        sound.volume = volume;
      }
      for (var i = 0; i < $ZAP_AUDIO_CHANNELS; ++i) {
        var t = Date.now();
        var channel = channels[i];
        if (channel._done < t) {
          channel._done = t + (sound.duration * 1000);
          channel.audio = sound;
          sound.load();
          sound.play();
          return;
        }
      }
    }
  }
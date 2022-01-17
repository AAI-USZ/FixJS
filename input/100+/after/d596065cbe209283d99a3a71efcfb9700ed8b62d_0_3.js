function (options) {
    var model = options.model
      , audio = model.getDOMAudio();
    model.$audio.on('progress', function () {
      console.log(this.buffered.end(0));
      console.log(this.duration);
      var loaded = parseInt(((this.buffered.end(0) / this.duration) * 100) + 3, 10);
      options.loading.css('width', loaded + '%');
    });
    var manualSeek = false;
    var loaded = false;
    options.handle.css('top', '-50%');
    model.$audio.on('timeupdate', function () {
      var rem = parseInt(audio.duration - audio.currentTime, 10),
      pos = Math.floor((audio.currentTime / audio.duration) * 100),
      mins = Math.floor(rem/60, 10),
      secs = rem - mins * 60;

      options.timeLeft.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));
      if (!manualSeek) { options.handle.css({left: pos + '%'}); }
      if (!loaded) {
        loaded = true;
      }
    });
  }
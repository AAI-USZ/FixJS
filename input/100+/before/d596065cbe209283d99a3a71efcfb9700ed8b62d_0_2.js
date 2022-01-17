function (options) {
    var _audio = options.audio;

    options.play.click(function () {
      switch (_audio.getState()) {
        case 'play':
          _audio.setState('pause');
        break;
        case 'pause':
          _audio.setState('play');
        break;
      }
    });
    options.next.click(function () {
      _audio.fetch(_audio.getCurrent() + 1);
    });
    options.prev.click(function () {
      _audio.fetch(_audio.getCurrent() - 1);
    });   
  }
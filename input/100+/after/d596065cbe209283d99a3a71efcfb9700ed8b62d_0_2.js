function (options) {
    var model = options.model;

    options.play.click(function () {
      switch (model.getState()) {
        case 'play':
          model.setState('pause');
          break;
        case 'pause':
          model.setState('play');
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
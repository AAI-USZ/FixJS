function () {
      switch (model.getState()) {
        case 'play':
          model.setState('pause');
          break;
        case 'pause':
          model.setState('play');
          break;
      }
    }
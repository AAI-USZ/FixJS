function () {
      switch (_audio.getState()) {
        case 'play':
          _audio.setState('pause');
        break;
        case 'pause':
          _audio.setState('play');
        break;
      }
    }
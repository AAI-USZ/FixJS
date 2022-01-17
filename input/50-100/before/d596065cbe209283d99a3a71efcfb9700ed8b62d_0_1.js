function (state) {
    switch (state) {
      case 'play':
        $audio.get(0).play();
      break;
      case 'pause':
        $audio.get(0).pause();
      break;
    }
    $audio.data('state', state);
    $audio.trigger('change:state', state);
  }
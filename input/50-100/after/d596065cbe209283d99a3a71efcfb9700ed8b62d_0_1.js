function (state) {
    switch (state) {
      case 'play':
        this.getDOMAudio().play();
        break;
      case 'pause':
        this.getDOMAudio().pause();
        break;
    }
    this.$audio.data('state', state);
    this.$audio.trigger('change:state', state);
  }
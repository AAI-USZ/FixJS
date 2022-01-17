function slv_handleEvent(evt) {
    switch (evt.type) {
      case 'click':
        var target = evt.target;
        if (!target)
          return;

        if (target.dataset.index) {
          PlayerView.dataSource = this.dataSource;
          PlayerView.play(target);

          changeMode(MODE_PLAYER);
        }

        break;

      default:
        return;
    }
  }
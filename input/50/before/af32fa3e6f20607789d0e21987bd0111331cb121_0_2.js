function() {
    console.debug('[Heatmap.pollAndUpdate]');
    this.update();
    this.model.sync();
  }
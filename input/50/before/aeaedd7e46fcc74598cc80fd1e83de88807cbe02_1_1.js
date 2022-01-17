function () {
      this.model.on('change:path', this.render, this);
      this.render();
    }
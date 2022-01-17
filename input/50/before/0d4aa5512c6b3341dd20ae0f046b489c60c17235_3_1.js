function () {
      this.drone = document.getElementById('droneicon');
      this.model.bind('change:heading', this.onHeadingChange, this);
    }
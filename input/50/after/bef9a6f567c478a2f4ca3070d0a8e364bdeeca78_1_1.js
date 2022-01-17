function() {
    this.initContainer();

    if (this.container.style.display == "none") {
      this.show();
    } else {
      this.hide();
    }
  }
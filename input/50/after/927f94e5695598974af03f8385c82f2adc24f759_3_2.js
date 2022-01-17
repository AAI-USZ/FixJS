function () {
    this.collection().removeItem(this);
    this.getElement().remove();
  }
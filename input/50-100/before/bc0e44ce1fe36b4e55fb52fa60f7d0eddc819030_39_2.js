  get element() {
    delete this.element;
    return this.element = document.getElementById('alarm');
  },

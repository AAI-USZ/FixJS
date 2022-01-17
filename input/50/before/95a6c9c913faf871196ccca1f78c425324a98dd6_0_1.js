function(data) {
    this._data = data;
    this.setValue((data && data.value) ? data.value : null);
    if (data) this.draw();
  }
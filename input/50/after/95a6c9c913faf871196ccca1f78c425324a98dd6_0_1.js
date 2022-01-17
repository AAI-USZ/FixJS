function(data) {
    this._data = data;
    if (!data) return;
    if (data.value) this.setValue(data.value);
    this.draw();
  }
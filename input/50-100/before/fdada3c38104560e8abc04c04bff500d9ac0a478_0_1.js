function() {
    var currItem = this._data[this._current];
    this._data.splice(this._current, 1);
    this._data.push(currItem);
    this._render();
}
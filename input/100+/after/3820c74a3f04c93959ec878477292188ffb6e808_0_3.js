function(item) {
    var container = $('fav-list-container');
    var elem = document.createElement('div');
    elem.id = this._getUIElemId(item);
    elem.textContent = item.frequency;
    container.appendChild(elem);

    this._autoShowHideEditBtn();
  }
function() {
    var savedList = localStorage.getItem(this.KEYNAME);
    this._favList = !savedList ? { } : JSON.parse(savedList);

    this._showListUI();

    $('edit-button').addEventListener('click',
                         this.startEdit.bind(this), false);
    $('cancel-button').addEventListener('click',
                         this.cancelEdit.bind(this), false);
    $('delete-button').addEventListener('click',
                         this.delSelectedItems.bind(this), false);
  }
function cd_endEditing() {
    if (!this._editing) {
      return false;
    }
    this._editing = false;

    this.view.classList.remove('editing');
    return true;
  }
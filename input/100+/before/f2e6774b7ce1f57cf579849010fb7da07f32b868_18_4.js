function cd_edit() {
    if (this._editing) {
      return;
    }
    this._editing = true;

    this.view.classList.add('editing');

    // setting a min-height in preparation for the keyboard appearance
    var minHeight = this.container.getBoundingClientRect().height;
    this.container.style.minHeight = minHeight + 'px';

    // keeping track of the size pre-keyboard appearance
    this._overlayHeight = this.overlay.getBoundingClientRect().height;
  }
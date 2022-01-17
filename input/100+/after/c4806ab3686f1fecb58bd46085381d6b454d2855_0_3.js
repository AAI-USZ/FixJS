function md_cancelHandler() {
    var evt = this.evt[this.currentOrigin];
    this.screen.classList.remove('modal-dialog');
    var elements = this.elements;

    switch (evt.detail.promptType) {
      case 'alert':
        elements.alert.classList.remove('visible');
        break;

      case 'prompt':
        /* return null when click cancel */
        evt.detail.returnValue = null;
        elements.prompt.classList.remove('visible');
        break;

      case 'confirm':
        /* return false when click cancel */
        evt.detail.returnValue = false;
        elements.confirm.classList.remove('visible');
        break;
    }

    if (evt.isPseudo && evt.callback) {
      evt.callback(evt.detail.returnValue);
    }

    evt.detail.unblock();

    delete this.evt[this.currentOrigin];
  }
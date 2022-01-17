function md_cancelHandler() {
    this.screen.classList.remove('modal-dialog');
    var elements = this.elements;

    switch (this.evt.detail.promptType) {
      case 'alert':
        elements.alert.classList.remove('visible');
        break;

      case 'prompt':
        /* return null when click cancel */
        this.evt.detail.returnValue = null;
        elements.prompt.classList.remove('visible');
        break;

      case 'confirm':
        /* return false when click cancel */
        this.evt.detail.returnValue = false;
        elements.confirm.classList.remove('visible');
        break;
    }

    if (this.evt.isPseudo && this.evt.callback) {
      this.evt.callback(this.evt.detail.returnValue);
    }

    this.evt.detail.unblock();

    // Let WindowManager know it can return to home now.
    this.blocked = false;
    this.evt = null;
  }
function md_confirmHandler() {
    this.screen.classList.remove('modal-dialog');
    var elements = this.elements;

    switch (this.evt.detail.promptType) {
      case 'alert':
        elements.alert.classList.remove('visible');
        break;

      case 'prompt':
        this.evt.detail.returnValue = elements.promptInput.value;
        elements.prompt.classList.remove('visible');
        break;

      case 'confirm':
        this.evt.detail.returnValue = true;
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
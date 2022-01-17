function md_confirmHandler() {
    this.screen.classList.remove('modal-dialog');
    var elements = this.elements;

    var evt = this.currentEvents[this.currentOrigin];

    switch (evt.detail.promptType) {
      case 'alert':
        elements.alert.classList.remove('visible');
        break;

      case 'prompt':
        evt.detail.returnValue = elements.promptInput.value;
        elements.prompt.classList.remove('visible');
        break;

      case 'confirm':
        evt.detail.returnValue = true;
        elements.confirm.classList.remove('visible');
        break;
    }

    if (evt.isPseudo && evt.callback) {
      evt.callback(evt.detail.returnValue);
    }

    evt.detail.unblock();

    delete this.currentEvents[this.currentOrigin];
  }
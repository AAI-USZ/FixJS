function md_show(origin) {
    this.currentOrigin = origin;
    var evt = this.currentEvents[origin];

    var message = evt.detail.message;
    var elements = this.elements;
    this.screen.classList.add('modal-dialog');

    switch (evt.detail.promptType) {
      case 'alert':
        elements.alertMessage.textContent = message;
        elements.alert.classList.add('visible');
        break;

      case 'prompt':
        elements.prompt.classList.add('visible');
        elements.promptInput.value = evt.detail.initialValue;
        elements.promptMessage.textContent = message;
        break;

      case 'confirm':
        elements.confirm.classList.add('visible');
        elements.confirmMessage.textContent = message;
        break;
    }
  }
function md_show() {
      var message = this.evt.detail.message;
      var elements = this.elements;
      this.screen.classList.add('modal-dialog');

      switch (this.evt.detail.promptType) {
        case 'alert':
          elements.alertMessage.textContent = message;
          elements.alert.classList.add('visible');
          break;

        case 'prompt':
          elements.prompt.classList.add('visible');
          elements.promptInput.value = this.evt.detail.initialValue;
          elements.promptMessage.textContent = message;
          break;

        case 'confirm':
          elements.confirm.classList.add('visible');
          elements.confirmMessage.textContent = message;
          break;
      }
  }
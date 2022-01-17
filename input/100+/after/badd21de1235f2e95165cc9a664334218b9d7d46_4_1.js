function cm_render(layout_type) {
    switch (layout_type) {
      case 'outgoing':
        this.callDuration.innerHTML = '...';
        this.answerButton.classList.add('hide');
        this.callToolbar.classList.remove('transparent');
        this.keypadButton.setAttribute('disabled', 'disabled');
        break;
      case 'incoming':
        this.answerButton.classList.remove('hide');
        this.callToolbar.classList.add('transparent');
        this.callDuration.innerHTML = '';
        break;
      case 'connected':
        // When the call is connected the speaker state is reset
        // keeping in sync...
        this._syncSpeakerEnabled();

        this.answerButton.classList.add('hide');

        if (!this.answerButton.classList.contains('transparent')) {
          this.callToolbar.classList.remove(
            'transparent');
        }

        this.keypadButton.removeAttribute('disabled');
        this.callDuration.innerHTML = '00:00';

        break;
    }
  }
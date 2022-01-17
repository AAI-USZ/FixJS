function cm_render(layout_type) {
    switch (layout_type) {
      case 'outgoing':
        document.getElementById('call-duration').innerHTML = '...';
        this.answerButton.classList.add('hide');
        document.getElementById('co-advanced').classList.remove('transparent');
        this.keypadButton.setAttribute('disabled', 'disabled');
        break;
      case 'incoming':
        this.answerButton.classList.remove('hide');
        document.getElementById('co-advanced').classList.add('transparent');
        document.getElementById('call-duration').innerHTML = '';
        break;
      case 'connected':
        // When the call is connected the speaker state is reset
        // keeping in sync...
        this._syncSpeakerEnabled();

        this.answerButton.classList.add('hide');

        if (!this.answerButton.classList.contains('transparent')) {
          document.getElementById('co-advanced').classList.remove(
            'transparent');
        }

        this.keypadButton.removeAttribute('disabled');
        document.getElementById('call-duration').innerHTML = '00:00';

        break;
    }
  }
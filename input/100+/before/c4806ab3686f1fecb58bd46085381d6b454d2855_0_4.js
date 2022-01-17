function md_showWithPseudoEvent(config) {
    if (this.evt && this.evt.detail.unblock) {
      this.evt.detail.unblock();
    }

    var pseudoEvt = {
      isPseudo: true,
      detail: {
        unblock: null
      }
    };

    pseudoEvt.detail.message = config.text;
    pseudoEvt.callback = config.callback;
    pseudoEvt.detail.promptType = config.type;
    if (config.type == 'prompt') {
        pseudoEvt.detail.initialValue = config.initialValue;
    }
    this.evt = pseudoEvt;
    this.show();
  }
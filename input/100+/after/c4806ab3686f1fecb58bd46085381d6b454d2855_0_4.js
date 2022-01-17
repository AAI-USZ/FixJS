function md_showWithPseudoEvent(config) {
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

    this.evt['system'] = pseudoEvt;
    this.show('system');
  }
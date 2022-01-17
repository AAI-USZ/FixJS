function lm_handleEvent(evt) {
    switch (evt.type) {
      case 'screenchange':
        if (!evt.detail.screenEnabled)
          this.hide();
        break;

      case 'click':
        if (!this.visible)
          return;

        var action = evt.target.dataset.value;
        if (!action) {
          return;
        }
        this.hide();
        if (this.onreturn)
          this.onreturn(action);
        break;

      case 'home':
        if (this.visible) {
          this.hide();
          if (this.onreturn)
            this.onreturn(null);
          evt.stopImmediatePropagation();
        }
        break;
    }
  }
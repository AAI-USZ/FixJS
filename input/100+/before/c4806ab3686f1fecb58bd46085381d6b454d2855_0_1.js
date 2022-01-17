function md_handleEvent(evt) {
    var elements = this.elements;
    switch (evt.type) {
      case 'mozbrowsershowmodalprompt':
        evt.preventDefault();
        this.blocked = true;

        // check if there is another modal dialog now.
        // unblock the previous mozbrowsershowmodalprompt event
        if (this.evt && this.evt.detail.unblock) {
          this.evt.detail.unblock();
        }

        this.evt = evt;
        this.show();
        break;

      case 'click':
        if (evt.currentTarget === elements.confirmCancel ||
            evt.currentTarget === elements.promptCancel) {
          this.cancelHandler();
        } else {
          this.confirmHandler();
        }
        break;
    }
  }
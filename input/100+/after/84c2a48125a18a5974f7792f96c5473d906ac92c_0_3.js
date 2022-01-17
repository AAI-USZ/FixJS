function cv_handleEvent(evt) {
    switch (evt.type) {
      case 'keyup':
        if (evt.keyCode != evt.DOM_VK_ESCAPE)
          return;

        if (this.close())
          evt.preventDefault();
        break;

      case 'received':
        var msg = evt.message;
        if (this.filter && this.filter == msg.sender) {
          this.showConversation(ConversationView.filter);
        }
        break;

      case 'transitionend':
        if (document.body.classList.contains('conversation'))
          return;

        this.view.innerHTML = '';
        break;

      case 'hashchange':
        this.toggleEditMode(window.location.hash == '#edit');

        var num = this.getNumFromHash();
        if (!num) {
          this.filter = null;
          return;
        }

        this.showConversation(num);
        break;

      case 'resize':
        if (!document.body.classList.contains('conversation'))
          return;

        this.updateInputHeight();
        this.scrollViewToBottom();
        break;

      case 'mozvisibilitychange':
        if (document.mozHidden)
          return;

        // Refresh the view when app return to foreground.
        var num = this.getNumFromHash();
        if (num) {
          this.showConversation(num);
        }
        break;

      case 'click':
        var targetIsMessage = ~evt.target.className.indexOf('message');
        if (evt.currentTarget == this.view && targetIsMessage) {
          this.onListItemClicked(evt);
        }
        break;
    }
  }
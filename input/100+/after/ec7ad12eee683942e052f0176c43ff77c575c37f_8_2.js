function cv_sendMessage() {
    var num = this.num.value;
    var self = this;
    var text = document.getElementById('view-msg-text').value;

    if (num === '' || text === '')
      return;

    MessageManager.send(num, text, function onsent(msg) {
      if (!msg) {
        ConversationView.input.value = text;
        ConversationView.updateInputHeight();

        if (ConversationView.filter) {
          if (window.location.hash !== '#num=' + ConversationView.filter)
            window.location.hash = '#num=' + ConversationView.filter;
          else
            ConversationView.showConversation(ConversationView.filter);
        }
        ConversationListView.updateConversationList();

        var resendConfirmStr = _('resendConfirmDialogMsg');
        var result = confirm(resendConfirmStr);
        if (result) {
          window.setTimeout(self.sendMessage.bind(self), 500);
        }
        return;
      }

      // Add a slight delay so that the database has time to write the
      // message in the background. Ideally we'd just be updating the UI
      // from "sending..." to "sent" at this point...
      window.setTimeout(function() {
        if (ConversationView.filter) {
          if (window.location.hash !== '#num=' + ConversationView.filter)
            window.location.hash = '#num=' + ConversationView.filter;
          else
            ConversationView.showConversation(ConversationView.filter);
        }
        ConversationListView.updateConversationList();
      }, 100);
    });

    // Create a preliminary message object and update the view right away.
    var message = {
      sender: null,
      receiver: num,
      delivery: 'sending',
      body: text,
      timestamp: new Date()
    };

    window.setTimeout((function updateMessageField() {
      this.input.value = '';
      this.updateInputHeight();
      this.input.focus();

      if (this.filter) {
        this.showConversation(this.filter, message);
        return;
      }
      this.showConversation(num, message);
    }).bind(this), 0);

    ConversationListView.updateConversationList(message);
  }
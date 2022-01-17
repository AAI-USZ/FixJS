function thui_sendMessage() {
    var num = this.num.value;
    var self = this;
    var text = document.getElementById('view-msg-text').value;

    if (num === '' || text === '')
      return;

    MessageManager.send(num, text, function onsent(msg) {
      if (!msg) {
        ThreadUI.input.value = text;
        ThreadUI.updateInputHeight();

        if (ThreadUI.filter) {
          if (window.location.hash !== '#num=' + ThreadUI.filter)
            window.location.hash = '#num=' + ThreadUI.filter;
          else
            ThreadUI.renderMessages(ThreadUI.filter);
        }
        ThreadListUI.renderThreads();
        return;
      }

      // Add a slight delay so that the database has time to write the
      // message in the background. Ideally we'd just be updating the UI
      // from "sending..." to "sent" at this point...
      window.setTimeout(function() {
        if (ThreadUI.filter) {
          if (window.location.hash !== '#num=' + ThreadUI.filter)
            window.location.hash = '#num=' + ThreadUI.filter;
          else
            ThreadUI.renderMessages(ThreadUI.filter);
        }
        ThreadListUI.renderThreads();
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
        this.renderMessages(this.filter, message);
        return;
      }
      this.renderMessages(num, message);
    }).bind(this), 0);

    ThreadListUI.renderThreads(message);
  }
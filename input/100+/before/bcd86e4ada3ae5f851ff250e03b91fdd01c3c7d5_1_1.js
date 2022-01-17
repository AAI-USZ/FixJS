function mm_handleEvent(event) {
    switch (event.type) {
      case 'received':
        ThreadListUI.renderThreads(event.message);
        var msg = event.message;
        if (ThreadUI.filter && ThreadUI.filter == msg.sender) {
          ThreadUI.renderMessages(ThreadUI.filter);
        }
        break;

      case 'hashchange':
        var bodyclassList = document.body.classList;
        switch (window.location.hash) {
          case '':
            ThreadListUI.renderThreads();
            bodyclassList.remove('conversation');
            bodyclassList.remove('conversation-new-msg');
            break;
          case '#edit':
            //TODO Add new style management
            break;
          default:
            var num = this.getNumFromHash();
            if (num) {
              ThreadUI.renderMessages(num);
            }
          break;
        }
        break;
      case 'mozvisibilitychange':
        if (!document.mozHidden) {
          ThreadListUI.renderThreads();
          var num = this.getNumFromHash();
          if (num) {
            ThreadUI.renderMessages(num);
          }
        }
        break;
    }
  }
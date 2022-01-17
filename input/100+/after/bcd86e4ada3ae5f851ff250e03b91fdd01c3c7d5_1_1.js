function mm_handleEvent(event) {
    switch (event.type) {
      case 'received':
        this.getMessages(ThreadListUI.renderThreads);
        var num = this.getNumFromHash();
        if (num) {
          //Append message
          ThreadUI.appendMessage(event.message);
        }
        break;

      case 'hashchange':
        var bodyclassList = document.body.classList;
        switch (window.location.hash) {
          case '':
            bodyclassList.remove('conversation');
            bodyclassList.remove('conversation-new-msg');
            break;
          case '#edit':
            //TODO Add new style management
            break;
          default:
            var num = this.getNumFromHash();
            if (num) {
              ThreadUI.cleanFields();
              if (num == '*') {
                document.body.classList.add('conversation-new-msg');
                document.body.classList.add('conversation');
              }else {
                var filter = this.createFilter(num);
                this.getMessages(ThreadUI.renderMessages, filter);
                document.body.classList.remove('conversation-new-msg');
                document.body.classList.add('conversation');
              }
            }
          break;
        }
        break;
      case 'mozvisibilitychange':
        if (!document.mozHidden) {
          this.getMessages(ThreadListUI.renderThreads);
          var num = this.getNumFromHash();
          if (num) {
            var filter = this.createFilter(num);
            this.getMessages(ThreadUI.renderMessages, filter);
          }
        }
        break;
    }
  }
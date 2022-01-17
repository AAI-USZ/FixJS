function mm_handleEvent(event) {
    switch (event.type) {
      case 'received':
        this.getMessages(ThreadListUI.renderThreads);
        var num = this.getNumFromHash();
        var sender = event.message.sender;
        if (num == sender) {
          //Append message
          ThreadUI.appendMessage(event.message);
        }
        break;
      case 'hashchange':
        var bodyclassList = document.body.classList;
        var mainWrapper = document.getElementById('main-wrapper');
        var threadMessages = document.getElementById('thread-messages');
        switch (window.location.hash) {
          case '#new':
            document.getElementById('messages-container').innerHTML = '';
            threadMessages.classList.add('new');
            MessageManager.slide();
            break;
          case '#thread-list':
            if (mainWrapper.classList.contains('edit')) {
              mainWrapper.classList.remove('edit');
            } else if (threadMessages.classList.contains('new')) {
              MessageManager.slide(function() {
                threadMessages.classList.remove('new');
              });
            } else {
              MessageManager.slide();
            }
            break;
          case '#edit':
            ThreadListUI.cleanForm();
            ThreadUI.cleanForm();
            mainWrapper.classList.toggle('edit');
            break;
          default:
            var num = this.getNumFromHash();
            if (num) {
              if (mainWrapper.classList.contains('edit')) {
                mainWrapper.classList.remove('edit');
              } else if (threadMessages.classList.contains('new')) {
                var filter = this.createFilter(num);
                this.getMessages(ThreadUI.renderMessages, filter);
                threadMessages.classList.remove('new');
              } else {
                var filter = this.createFilter(num);
                this.getMessages(ThreadUI.renderMessages,
                  filter, null, MessageManager.slide);
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
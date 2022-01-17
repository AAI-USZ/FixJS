function thlui_renderThreads(messages) {
    ThreadListUI.view.innerHTML = '';
    var threadIds = [], headerIndex, unreadThreads = [];
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var num = message.delivery == 'received' ?
      message.sender : message.receiver;
      if (!message.read) {
        if (unreadThreads.indexOf(num) == -1) {
          unreadThreads.push(num);
        }
      }
      if (threadIds.indexOf(num) == -1) {
        var thread = {
          'body': message.body,
          'name': num,
          'num': num,
          'timestamp': message.timestamp.getTime(),
          'unreadCount': !message.read ? 1 : 0,
          'id': num
        };
        if (threadIds.length == 0) {
          var currentTS = (new Date()).getTime();
          headerIndex = Utils.getDayDate(currentTS);
          ThreadListUI.createNewHeader(currentTS);
        }else {
          var tmpIndex = Utils.getDayDate(message.timestamp.getTime());
          if (tmpIndex < headerIndex) {
            ThreadListUI.createNewHeader(message.timestamp.getTime());
            headerIndex = tmpIndex;
          }
        }
        threadIds.push(num);
        ThreadListUI.appendThread(thread);
      }
    }
    // Update threads with 'unread'
    for (var i = 0; i < unreadThreads.length; i++) {
      document.getElementById(unreadThreads[i]).classList.add('unread');
    }
  }
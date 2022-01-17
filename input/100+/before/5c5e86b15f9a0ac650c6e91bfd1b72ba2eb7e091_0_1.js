function mm_getMessages(messages) {
      var lastMessage = messages[messages.length - 1];
      if (pendingMsg &&
          (!lastMessage || lastMessage.id !== pendingMsg.id))
        messages.push(pendingMsg);

      var fragment = '';
      var unreadList = [];

      for (var i = 0; i < messages.length; i++) {
        var msg = messages[i];

        if (!msg.read)
          unreadList.push(msg.id);

    // Add a grouping header if necessary
        var header = ConversationListView.createNewHeader(msg);
        if (header != null) {
          fragment += header;
        }
        fragment += self.createMessageThread(msg);
      }

      view.innerHTML = fragment;
      self.scrollViewToBottom(currentScrollTop);

      bodyclassList.add('conversation');

      MessageManager.markMessagesRead(unreadList, true, function markMsg() {
        // TODO : Since spec do not specify the behavior after mark success or
        //        error, we do nothing currently.
      });
    }
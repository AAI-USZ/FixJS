function getMessagesCallback(messages) {
      if (pendingMsg &&
          (!messages[0] || messages[0].id !== pendingMsg.id))
        messages.unshift(pendingMsg);

      var conversations = {};
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];

        // XXX why does this happen?
        if (!message.delivery)
          continue;

        var num = message.delivery == 'received' ?
                  message.sender : message.receiver;

        var read = message.read;
        var conversation = conversations[num];
        if (conversation && !conversation.hidden) {
          conversation.unreadCount += !read ? 1 : 0;
          continue;
        }

        if (!conversation) {
          conversations[num] = {
            'hidden': false,
            'body': message.body,
            'name': num,
            'num': num,
            'timestamp': message.timestamp.getTime(),
            'unreadCount': !read ? 1 : 0,
            'id': i
          };
        } else {
          conversation.hidden = false;
          conversation.timestamp = message.timestamp.getTime();
          conversation.body = message.body;
        }
      }

      var fragment = '';
      var orderedConversations = [];
      for (var num in conversations) {
        /*
          Push an array containing [timestamp, conversation]
          so we can order the list by timestamp.
        */
        orderedConversations.push([conversations[num].timestamp,
                                  conversations[num]]);
      }

      orderedConversations.sort(function sortByTimestamp(a, b) {
        return b[0] - a[0];
      });

      // Now we have the ordered conversations
      var conversation;
      for (var i in orderedConversations) {
        conversation = orderedConversations[i][1];
        if (self.delNumList.indexOf(conversation.num) > -1) {
          continue;
        }

        // Add a grouping header if necessary
        var header = self.createNewHeader(conversation);
        if (header != null) {
          fragment += header;
        }
        fragment += self.createNewConversation(conversation);
      }

      self.view.innerHTML = fragment;
      var conversationList = self.view.children;

      // update the conversation sender/receiver name with contact data.
      for (var i = 0; i < conversationList.length; i++) {
        self.updateMsgWithContact(conversationList[i]);
      }

    }
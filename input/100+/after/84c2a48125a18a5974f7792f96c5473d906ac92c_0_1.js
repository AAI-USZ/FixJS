function getMessagesCallback(messages) {
      // if (pendingMsg &&
      //     (!messages[0] || messages[0].id !== pendingMsg.id))
      //   messages.unshift(pendingMsg);

      /** QUICK and dirty fix for the timestamp issues,
       * it seems that API call does not give the messages ordered
       * so we need to sort the array
       */
      messages.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });

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
        if (conversation) {
          conversation.unreadCount += !read ? 1 : 0;
          continue;
        }

        conversations[num] = {
          'body': message.body,
          'name': num,
          'num': num,
          'timestamp': message.timestamp.getTime(),
          'unreadCount': !read ? 1 : 0,
          'id': i
        };
      }

      var fragment = '';
      for (var num in conversations) {
        conversation = conversations[num];
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
function deleteAll(messages) {
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].delivery == 'sent' ||
           messages[i].delivery == 'received') {
            ThreadListUI.delNumList.push(messages[i].id);
          } else { //pending
            ThreadListUI.pendingDelList.push(messages[i]);
          }
        }
      }
function() {
        //TODO Remove 'pending' from Steve class

        // TODO move when Steve code will be landed
        if (window.location.hash == '#num=*') {
          window.location.hash = '#num=' + num;
        } else {
          MessageManager.getMessages(ThreadListUI.renderThreads);
        }
        MessageManager.getMessages(ThreadListUI.renderThreads);

      }
function thui_sendMessage() {
    // Retrieve num depending on hash
    var hashNum = MessageManager.getNumFromHash();
    // Depending where we are, we get different num
    if (hashNum == '*') {
      var num = this.num.value;
    } else {
      var num = hashNum;
    }
    // Retrieve text
    var text = this.input.value;
    // If we have something to send
    if (num != '' && text != '') {
      if (hashNum == '*') {
        ThreadUI.title.innerHTML = num;
        document.body.classList.remove('conversation-new-msg');
      }
      // Create 'PendingMessage'
      var message = {
        sender: null,
        receiver: num,
        delivery: 'sending',
        body: text,
        timestamp: new Date()
      };
      // Append to DOM
      this.appendMessage(message);

      // TODO Append to Steve class
      // TODO Once Steve code land, we will change hash to 'num='+num
      // directly

      // Clean Fields
      ThreadUI.cleanFields();
      MessageManager.send(num, text, function() {
        //TODO Remove 'pending' from Steve class

        // TODO move when Steve code will be landed
        if (window.location.hash == '#num=*') {
          window.location.hash = '#num=' + num;
        } else {
          MessageManager.getMessages(ThreadListUI.renderThreads);
        }
        MessageManager.getMessages(ThreadListUI.renderThreads);

      });
    }


  }
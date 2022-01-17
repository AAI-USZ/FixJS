function thui_deleteAllMessages() {
    var response = window.confirm('Delete all messages\n' +
                                  'Are you sure you want to do this?');
    if (response) {
      this.delNumList = [];
      this.pendingDelList = [];
      var tempTSList = [];

      var inputs = this.view.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.parentNode.classList.add('undo-candidate');
        var inputValue = inputs[i].value;
        if (inputValue.indexOf('ts_') != -1) {
          var valueParsed = inputValue.replace('ts_', '');
          tempTSList.push(parseFloat(valueParsed));
        } else {
          var valueParsed = inputValue.replace('id_', '');
          ThreadUI.delNumList.push(parseFloat(valueParsed));
        }
      }
      MessageManager.getMessages(function(messages) {
        for (var i = 0; i < messages.length; i++) {
          var message = messages[i];
          if (message.delivery == 'sending') {
            if (tempTSList.indexOf(message.timestamp.getTime()) != -1) {
              ThreadUI.pendingDelList.push(message);
            }
          }
        }
        ThreadUI.executeDeletion();
      });
    }
  }
function initChat() {
        appendFromLocalStorage();

        setTimeout(function() {
            $('#msg').focus();
            // scroll the chat div to bottom
            scrollToBottom(true); // don't animate
        }, 200);

        var msgText = localStorage.getItem('msg:' + myUid + ':' + friendUid);
        if (msgText) {
          setMsgValue(msgText);
          $('#msg').prop('scrollTop', $('#msg').prop('scrollHeight'));
          $('#msg').focus();
        }
      }
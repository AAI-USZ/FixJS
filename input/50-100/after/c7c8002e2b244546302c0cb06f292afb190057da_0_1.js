function discoverChatInputElement() {

  var chatFrame = document.querySelector('iframe[title="Group chat window"]');

  if (chatFrame) {

    var chatDom = chatFrame.contentDocument;

    if (chatDom) {

      var chatInput = chatDom.querySelector('textarea');

      if (chatInput) {

        onChatInputDiscovered(chatDom, chatInput);

        return; // Exit so we don't loop again.

      }

    }

  }



  setTimeout(discoverChatInputElement, 1000);

}
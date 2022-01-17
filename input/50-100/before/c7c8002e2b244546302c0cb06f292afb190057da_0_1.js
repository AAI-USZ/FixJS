function discoverChatInputElement() {

  var chatInput = document.querySelector('textarea');

  if (chatInput) {

    onChatInputDiscovered(chatInput);

  }

  else {

    setTimeout(discoverChatInputElement, 1000);

  }

}
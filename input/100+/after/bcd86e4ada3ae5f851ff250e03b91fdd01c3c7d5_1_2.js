function thui_renderMessages(messages) {
    // Update Header
    ThreadUI.title.innerHTML = MessageManager.getNumFromHash();
    // Sorting messages reverse
    messages.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });
    // Clean list of messages
    ThreadUI.view.innerHTML = '';
    // Update header index
    ThreadUI.headerIndex = 0;
    // Per each message I will append DOM element
    messages.forEach(ThreadUI.appendMessage);
  }
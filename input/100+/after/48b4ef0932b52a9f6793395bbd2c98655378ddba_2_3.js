function(messageNode, event) {
    var header = messageNode.message;
    if (this.editMode) {
      var idx = this.selectedMessages.indexOf(header);
      if (idx !== -1) {
        this.selectedMessages.splice(idx, 1);
        messageNode.classList.remove('msg-header-item-selected');
      }
      else {
        this.selectedMessages.push(header);
        messageNode.classList.add('msg-header-item-selected');
      }
      this.selectedMessagesUpdated();
      return;
    }

    // For now, let's do the async load before we trigger the card to try and
    // avoid reflows during animation or visual popping.
    Cards.eatEventsUntilNextCard();
    header.getBody(function gotBody(body) {
      Cards.pushCard(
        'message-reader', 'default', 'animate',
        {
          header: header,
          body: body
        });
    });
  }
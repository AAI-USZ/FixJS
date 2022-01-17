function(messageNode, event) {
    // For now, let's do the async load before we trigger the card to try and
    // avoid reflows during animation or visual popping.
    Cards.eatEventsUntilNextCard();
    var header = messageNode.message;
    header.getBody(function gotBody(body) {
      Cards.pushCard(
        'message-reader', 'default', 'animate',
        {
          header: header,
          body: body
        });
    });
  }
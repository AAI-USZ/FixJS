function(cards) {
    var self = this;
    var category = "playerCards";

    var numExistingCards = this.repository.getCategorySize('playerCards');
    var numCards = cards.length + numExistingCards;
    console.debug("numExistingCards " + numExistingCards + " numCards " + numCards);
    var stepSize = constants.CARD_WIDTH + constants.CARD_PADDING;
    var offset = (constants.CARD_AREA_WIDTH - (numCards * stepSize))/2;
    var newCardsOffset = offset + (numExistingCards * stepSize);
    console.debug("offset " + offset + " newCardsOffset " + newCardsOffset + " stepSize " + stepSize);

    if (numExistingCards > 0) {
      var oldOffset = (constants.CARD_AREA_WIDTH - (numExistingCards * stepSize))/2;
      var dx = offset - oldOffset;
      console.debug("oldOffset " + oldOffset + " dx " + dx);
      var existingCards = this.repository.getElementsByCategory('playerCards');
      _.each(existingCards, function(c) {
        c.translate(dx, 0);
      });
    }

    if (numCards > 0) {

    var compositeAnimation = [];
      _.each(cards, function(card, i) {
        var startX = constants.DECK_X;
        var startY = constants.DECK_Y;
        var endX = (i * stepSize) + newCardsOffset;
        var endY = constants.CARD_AREA_Y + constants.CARD_AREA_PADDING;

        var cardId = self.getCardId(card, category);
        var cardImage = self.drawCard(card, startX, startY, constants.CARD_WIDTH, constants.CARD_HEIGHT, category);
        cardImage.hide();
        self.queueAnimate(cardImage, {x: endX, y: endY}, constants.PLAYER_CARD_ANIMATE_TIME);
        self.repository.addElement(cardImage, cardId, category);
      });
    }
  }
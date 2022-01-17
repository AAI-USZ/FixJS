function(card, x, y, width, height, category) {
    var self = this;
    var cardImage = this.getCanvas().image(this.getCardImageFile(card.rank, card.suit), x, y, width, height);

    cardImage.mouseover(function(event) {
        this.translate(0,-1*constants.CARD_HEIGHT);
        this.attr({'height': constants.CARD_HEIGHT * 2, 'width': constants.CARD_WIDTH * 2});
        this.toFront();
    });
    cardImage.mouseout(function(event) {
        this.translate(0,constants.CARD_HEIGHT);
        this.attr({'height': constants.CARD_HEIGHT, 'width': constants.CARD_WIDTH});
        self.clearError();
    });

    cardImage.click(function(event) {
        console.log("DEBUG in cardImage clickEventHandler");
        self.game.handleCardClicked(card);
    });

    cardImage.id = this.getCardId(card, category);
    return cardImage;
  }
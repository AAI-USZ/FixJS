function(playerMove) {
    var category = "playerMoves";

    var player = playerMove.get('player')();
    var card = playerMove.get('card');
    var playerIndex = player.get('index'); 

    var startX = constants.PLAYER_X_ARR[playerIndex];
    var startY = constants.PLAYER_Y_ARR[playerIndex];

    var endX = constants.CARD_X_ARR[playerIndex];
    var endY = constants.CARD_Y_ARR[playerIndex];

    var cardId = this.getCardId(card, category);
    var cardImage = this.drawCard(card, startX, startY, constants.CARD_WIDTH, constants.CARD_HEIGHT, category);
    cardImage.hide();
    console.debug("Drawing playerMove"); 
    this.queueAnimate(cardImage, {x: endX, y: endY}, constants.PLAYER_MOVE_ANIMATE_TIME);
    this.repository.addElement(cardImage, cardId, category);
  }
function(cardIndex, showMethod) {
    var cardInst = (cardIndex !== null) ? this._cardStack[cardIndex] : null;

    var targetLeft;
    if (cardInst)
      targetLeft = (-cardInst.left) + 'px';
    else
      targetLeft = '0px';

    var cardsNode = this._cardsNode;
    if (cardsNode.style.left !== targetLeft) {
      if (showMethod === 'immediate') {
        // XXX cross-platform support.
        cardsNode.style.MozTransitionProperty = 'none';
        // make sure the reflow sees the transition is turned off.
        cardsNode.clientWidth;
        // explicitly clear since there will be no animation
        this._eatingEventsUntilNextCard = false;
      }
      else {
        this._eatingEventsUntilNextCard = true;
      }

      cardsNode.style.left = targetLeft;

      if (showMethod === 'immediate') {
        // make sure the instantaneous transition is seen before we turn
        // transitions back on.
        cardsNode.clientWidth;
        cardsNode.style.MozTransitionProperty = 'left';
      }
    }
    else {
      // explicitly clear since there will be no animation
      this._eatingEventsUntilNextCard = false;
    }

    this._activeCardIndex = cardIndex;
    if (cardInst)
      this._trayActive = cardInst.modeDef.tray;
  }
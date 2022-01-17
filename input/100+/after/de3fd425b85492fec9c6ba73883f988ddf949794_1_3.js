function(cardDomNode, showMethod, numCards,
                                    nextCardSpec) {
    if (!this._cardStack.length)
      return;

    var firstIndex, iCard, cardInst;
    if (cardDomNode === undefined) {
      throw new Error('undefined is not a valid card spec!');
    }
    else if (cardDomNode === null) {
      firstIndex = 0;
    }
    else {
      for (iCard = this._cardStack.length - 1; iCard >= 0; iCard--) {
        cardInst = this._cardStack[iCard];
        if (cardInst.domNode === cardDomNode) {
          firstIndex = iCard;
          break;
        }
      }
      if (firstIndex === undefined)
        throw new Error('No card represented by that DOM node');
    }
    if (!numCards)
      numCards = this._cardStack.length - firstIndex;

    var deadCardInsts = this._cardStack.splice(
                          firstIndex, numCards);
    for (iCard = 0; iCard < deadCardInsts.length; iCard++) {
      cardInst = deadCardInsts[iCard];
      try {
        cardInst.cardImpl.die();
      }
      catch (ex) {
        console.warn('Problem cleaning up card:', ex, '\n', ex.stack);
      }
      switch (showMethod) {
        case 'animate':
        case 'immediate': // XXX handle properly
          this._animatingDeadDomNodes.push(cardInst.domNode);
          break;
        case 'none':
          cardInst.domNode.parentNode.removeChild(cardInst.domNode);
          break;
      }
    }
    if (showMethod !== 'none') {
      var nextCardIndex = null;
      if (nextCardSpec)
        nextCardIndex = this._findCard(nextCardSpec);
      else if (this._cardStack.length)
        nextCardIndex = this._cardStack.length - 1;
      this._showCard(nextCardIndex, showMethod);
    }
  }
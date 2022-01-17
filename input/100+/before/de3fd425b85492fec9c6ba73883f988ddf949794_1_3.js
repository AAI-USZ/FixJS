function(cardDomNode, showMethod) {
    if (!this._cardStack.length)
      return;

    var firstIndex, iCard, cardInst;
    if (cardDomNode == null) {
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

    var deadCardInsts = this._cardStack.splice(
                          firstIndex, this._cardStack.length - firstIndex);
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
      if (this._cardStack.length)
        nextCardIndex = this._cardStack.length - 1;
      this._showCard(nextCardIndex, showMethod);
    }
  }
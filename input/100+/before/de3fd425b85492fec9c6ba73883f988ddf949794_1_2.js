function(type, mode, showMethod, args, placement) {
    var cardDef = this._cardDefs[type];
    if (!cardDef)
      throw new Error('No such card def type: ' + type);
    var modeDef = cardDef.modes[mode];
    if (!modeDef)
      throw new Error('No such card mode: ' + mode);

    var domNode = this._templateNodes[type].cloneNode(true);

    var cardImpl = new cardDef.constructor(domNode, mode, args);
    var cardInst = {
      domNode: domNode,
      cardDef: cardDef,
      modeDef: modeDef,
      cardImpl: cardImpl,
    };
    var cardIndex, insertBuddy;
    if (!placement) {
      cardIndex = this._cardStack.length;
      insertBuddy = null;
    }
    else if (placement === 'left') {
      cardIndex = this._activeCardIndex++;
      insertBuddy = this._cardsNode.children[cardIndex];
    }
    else if (placement === 'right') {
      cardIndex = this._activeCardIndex + 1;
      if (cardIndex >= this._cardStack.length)
        insertBuddy = null;
      else
        insertBuddy = this._cardsNode.children[cardIndex];
    }
    this._cardStack.splice(cardIndex, 0, cardInst);
    this._cardsNode.insertBefore(domNode, insertBuddy);
    this._adjustCardSizes();
    if ('postInsert' in cardImpl)
      cardImpl.postInsert();

    if (showMethod !== 'none') {
      // If we want to animate and we just inserted the card to the left, then
      // we need to update our position so that the user perceives animation.
      // (Otherwise our offset is already showing the new card.)
      if (showMethod === 'animate' && placement === 'left')
        this._showCard(this._activeCardIndex, 'immediate');

      this._showCard(cardIndex, showMethod);
    }
  }
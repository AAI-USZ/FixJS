function(event) {
    if (this._eatingEventsUntilNextCard)
      this._eatingEventsUntilNextCard = false;
    if (this._animatingDeadDomNodes.length) {
      this._animatingDeadDomNodes.forEach(function(domNode) {
        if (domNode.parentNode)
          domNode.parentNode.removeChild(domNode);
      });
      // Our coordinate space may have been affected, so update and re-show
      // the current card.
      this._adjustCardSizes();
      this._showCard(this.activeCardIndex, 'immediate');
    }
  }
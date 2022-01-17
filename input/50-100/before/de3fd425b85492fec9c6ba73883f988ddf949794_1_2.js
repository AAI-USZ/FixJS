function(event) {
    if (this._eatingEventsUntilNextCard)
      this._eatingEventsUntilNextCard = false;
    if (this._animatingDeadDomNodes.length) {
      this._animatingDeadDomNodes.forEach(function(domNode) {
        if (domNode.parentNode)
          domNode.parentNode.removeChild(domNode);
      });
    }
  }
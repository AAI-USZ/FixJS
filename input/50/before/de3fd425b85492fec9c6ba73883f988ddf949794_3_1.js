function() {
    // We instantaneously transitioned to this card, so instantaneously
    // transition back.  There is no UX spec for this; we could very well go
    // animated for this.
    Cards.removeCardAndSuccessors(this.domNode, 'none');
    Cards.moveToCard(['folder-picker', 'default'], 'immediate');
  }
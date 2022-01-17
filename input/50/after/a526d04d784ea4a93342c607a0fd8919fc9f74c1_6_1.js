function(e) {
    // If the lockscreen is active, it will stop propagation on this event
    // and we'll never see it here. Similarly, other overlays may use this 
    // event to hide themselves and may prevent the event from getting here.
    // Note that for this to work, the lockscreen and other overlays must
    // be included in index.html before this one, so they can register their
    // event handlers before we do.
    setDisplayedApp(null);
    if (CardsView.cardSwitcherIsShown())
      CardsView.hideCardSwitcher();
  }
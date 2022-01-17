function(e) {
    // The attention screen can 'eat' this event
    if (!LockScreen.locked && !e.defaultPrevented) {
      setDisplayedApp(null);
      if (CardsView.cardSwitcherIsShown())
        CardsView.hideCardSwitcher();
    }
  }
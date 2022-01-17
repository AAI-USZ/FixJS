function longPressHandler() {
      // If the timer fires, then this was a long press on the home key
      // So bring up the app switcher overlay if we're not locked
      // and if the card switcher is not already shown
      timer = null;

      if (!ModalDialog.blocked &&
          !LockScreen.locked &&
          !CardsView.cardSwitcherIsShown()) {
        CardsView.showCardSwitcher();
      }
    }
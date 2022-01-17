function keyupHandler(e) {
      if (e.keyCode !== e.DOM_VK_HOME)
        return;

      if (!keydown) // the keydown event was defaultPrevented, so
        return;     // we can ignore this keyup

      keydown = false;

      // If the key was released before the timer, then this was
      // a short press. Show the homescreen and cancel the timer.
      // Otherwise it was a long press that was handled in the timer
      // function so just ignore it.
      if (timer !== null) {
        clearInterval(timer);
        timer = null;

        // If the screen is locked, ignore the home button.
        // If the event has defualtPrevented (from the screenshot module)
        // the we also itnore it
        // Otherwise, make the homescreen visible.
        // Also, if the card switcher is visible, then hide it.
        if (!ModalDialog.blocked && !LockScreen.locked && !e.defaultPrevented) {
          // The attention screen can 'eat' this event
          if (!e.defaultPrevented)
            setDisplayedApp(null);
          if (CardsView.cardSwitcherIsShown())
            CardsView.hideCardSwitcher();
        }
      }

      // No one ever sees the HOME key but us
      e.stopPropagation();
    }
function showCardSwitcher() {
    // Apps info from WindowManager
    displayedApp = WindowManager.getDisplayedApp();
    runningApps = WindowManager.getRunningApps();

    // If user is not able to sort apps manualy,
    // display most recetly active apps on the far left
    if (!USER_DEFINED_ORDERING) {
      var sortable = [];
      for (var origin in runningApps)
        sortable.push({origin: origin, app: runningApps[origin]});

      sortable.sort(function(a, b) {
        return b.app.launchTime - a.app.launchTime;
      });
      runningApps = {};

      // I assume that object properties are enumerated in
      // the same order they were defined.
      // There is nothing about that in spec, but I've never
      // seen any unexpected behavior.
      sortable.forEach(function(element) {
        runningApps[element.origin] = element.app;
      });
    } else {
      // user ordering actions
    }

    if (SNAPPING_SCROLLING) {
      cardsView.style.overflow = 'hidden'; //disabling native scrolling
      cardsView.addEventListener('mousedown', this);
    }

    // First add an item to the cardsList for each running app
    for (var origin in runningApps)
      addCard(origin, runningApps[origin]);

    // Then make the cardsView overlay active
    cardsView.classList.add('active');

    // Make sure we're in portrait mode
    screen.mozLockOrientation('portrait');

    // If there is a displayed app, take keyboard focus away
    if (displayedApp)
      runningApps[displayedApp].frame.blur();

    function addCard(origin, app) {
      // Build a card representation of each window.
      // And add it to the card switcher
      var card = document.createElement('li');
      card.style.background = '-moz-element(#' + app.frame.id + ') no-repeat';
      var close_button = document.createElement('a');
      card.appendChild(close_button);

      //display app icon on the tab
      if (DISPLAY_APP_ICON) {
        var appIcon = document.createElement('img');

        appIcon.classList.add('appIcon');
        appIcon.src = getIconURI(origin);
        card.appendChild(appIcon);
      }

      var title = document.createElement('h1');
      title.textContent = app.name;
      card.appendChild(title);
      cardsList.appendChild(card);

      // Set up event handling

      // A click on the close button ends that task. And if it is the
      // last task, it dismisses the task switcher overlay
      close_button.addEventListener('click', function(e) {
        // Don't trigger a click on our ancestors
        e.stopPropagation();

        // Remove the icon from the task list
        cardsList.removeChild(card);

        // Stop the app itself
        // If the app is the currently displayed one,
        // this will also switch back to the homescreen
        // (though the task switcher will still be displayed over it)
        WindowManager.kill(origin);

        // if there are no more running apps, then dismiss
        // the task switcher
        if (WindowManager.getNumberOfRunningApps() === 0)
          hideCardSwitcher();
      });

      // A click elsewhere in the card switches to that task
      card.addEventListener('click', function() {
        hideCardSwitcher();
        WindowManager.launch(origin);
      });
    }
  }
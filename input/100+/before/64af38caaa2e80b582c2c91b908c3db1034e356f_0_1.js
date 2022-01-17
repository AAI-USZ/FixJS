function onEndEvent(evt) {
    evt.stopPropagation();
    var element = evt.target;
    cardsView.removeEventListener('mousemove', CardsView);
    cardsView.removeEventListener('mouseup', CardsView);

    var touchPosition = {
        x: evt.touches ? evt.touches[0].pageX : evt.pageX,
        y: evt.touches ? evt.touches[0].pageY : evt.pageY
    };

    // if the element we start dragging on is a card
    if (evt.target.classList.contains('card') && MANUAL_CLOSING) {
      var differenceY = initialTouchPosition.y - touchPosition.y;
      if (differenceY > removeCardThreshold) {
        // Without removing the listener before closing card
        // sometimes the 'click' event fires, even if 'mouseup'
        // uses stopPropagation()
        element.removeEventListener('click', runApp);

        // Remove the icon from the task list
        cardsList.removeChild(element);

        // Stop the app itself
        // If the app is the currently displayed one,
        // this will also switch back to the homescreen
        // (though the task switcher will still be displayed over it)
        WindowManager.kill(element.dataset['origin']);

        // if there are no more running apps, then dismiss
        // the task switcher
        if (WindowManager.getNumberOfRunningApps() === 0)
          hideCardSwitcher();

        return;
      } else {
        evt.target.style.MozTransform = 'scale(0.6)';
      }
    }

    if (SNAPPING_SCROLLING) {
      var differenceX = initialTouchPosition.x - touchPosition.x;
      if (Math.abs(differenceX) > threshold) {
        if (
          differenceX > 0 &&
          currentDisplayed < WindowManager.getNumberOfRunningApps() - 1
        ) {
          currentDisplayed++;
          alignCard(currentDisplayed);
        } else if (differenceX < 0 && currentDisplayed > 0) {
          currentDisplayed--;
          alignCard(currentDisplayed);
        }
      } else {
        alignCard(currentDisplayed);
      }
    }
  }
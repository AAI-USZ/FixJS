function onStartEvent(evt) {
    evt.stopPropagation();
    evt.target.setCapture(true);
    cardsView.addEventListener('mousemove', CardsView);
    cardsView.addEventListener('mouseup', CardsView);

    initialCardViewPosition = cardsView.scrollLeft;
    initialTouchPosition = {
        x: evt.touches ? evt.touches[0].pageX : evt.pageX,
        y: evt.touches ? evt.touches[0].pageY : evt.pageY
    };
  }
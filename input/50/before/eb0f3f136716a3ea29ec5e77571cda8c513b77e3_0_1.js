function scrollEnd(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    overlayStyle.MozTransitionDelay = '3s';
    overlayStyle.MozTransitionDuration = '0.2s';
    overlayStyle.opacity = '0';
  }
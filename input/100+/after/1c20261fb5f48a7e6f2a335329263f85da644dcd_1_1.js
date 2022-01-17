function spriteTransition(e) {
    var prop = e.propertyName;
    var classes = sprite.classList;

    if (sprite.className === 'open' && prop.indexOf('transform') != -1) {
      openFrame.classList.add('active');
      windows.classList.add('active');

      classes.add('faded');
    } else if (classes.contains('faded') && prop === 'opacity') {
      openFrame.setVisible(true);
      openFrame.focus();
    
      // Dispatch a 'appopen' event,
      // Modal dialog would use this.
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('appopen', true, false, { origin: displayedApp });
      openFrame.dispatchEvent(evt);

      setTimeout(openCallback);
    } else if (classes.contains('close') && prop === 'color') {
      closeFrame.classList.remove('active');
      windows.classList.remove('active');
    } else if (classes.contains('close') && prop.indexOf('transform') != -1) {
      classes.remove('open');
      classes.remove('close');

      setTimeout(closeCallback);
    }
  }
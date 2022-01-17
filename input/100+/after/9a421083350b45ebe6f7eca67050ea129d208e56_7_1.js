function openWindow(origin, callback) {
    var app = runningApps[origin];
    openFrame = app.frame;
    openCallback = callback || function() {};

    sprite.className = 'open';
    
    // Dispatch a 'appopen' event,
    // Modal dialog would use this.
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('appopen', true, false, { origin: origin });
    frame.dispatchEvent(evt);
  }
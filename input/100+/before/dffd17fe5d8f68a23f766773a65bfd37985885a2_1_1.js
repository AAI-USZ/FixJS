function createWindow(url, settings){
    if (url !== null && typeof url === 'object') {
      settings = url;
      url = settings.url;
    }
    url = url || 'http://appjs/';
    settings = _extend({}, settings);
    if (settings.icons) {
      ['smaller', 'small', 'big', 'bigger'].forEach(function(size){
        settings.icons[size] = path.resolve(settings.icons[size] || '');
      });
    } else {
      settings.icons = {};
    }

    var self = this;
    var id = this.windows.length;
    var nativeWindow = _createWindow.call(this, url, settings);
    nativeWindow.id = id;
    nativeWindow._events = {};
    var window = new Window(nativeWindow);
    window._events = {};
    Object.defineProperty(window, '_events', { enumerable: false });
    this.windows.push(window);

    nativeWindow.pipe('create', window);
    nativeWindow.pipe('close', window);
    nativeWindow.pipe('minimized', window);
    nativeWindow.pipe('maximized', window);
    nativeWindow.pipe('restored', window);
    nativeWindow.pipe('move', window);
    nativeWindow.pipe('resize', window);
    return window;
  }
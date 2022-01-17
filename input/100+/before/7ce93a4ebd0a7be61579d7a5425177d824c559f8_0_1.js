function createWindow(url, settings){
    url = url || 'http://appjs/';
    if (typeof url === 'object') {
      settings = url;
      url = settings.url;
    }
    settings = _extend({}, settings);
    if (settings.icons) {
      ['smaller', 'small', 'big', 'bigger'].forEach(function(size){
        settings.icons[size] = path.resolve(settings.icons[size] || '');
      });
    } else {
      settings.icons = {};
    }

    var self = this;
    var window = _createWindow.call(this, url, settings);
    Object.defineProperty(window, 'id', { value: this.windows.length });
    this.windows.push(window);

    window.once('ready', function(){
      stylesForWindow(window);
      window.runInBrowser(browserInit);
    });

    window.on('close', function(){
      var id = this.id;
      process.nextTick(function(){
        self.windows[id] = null;
      });
    });

    window.on('log', function(obj){
      self.emit('log', this.id, obj);
    });
    return window;
  }
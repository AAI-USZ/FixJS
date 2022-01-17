function EpicEditor(options) {
    // Default settings will be overwritten/extended by options arg
    var self = this
      , opts = options || {}
      , _defaultFileSchema
      , _defaultFile
      , defaults = { container: 'epiceditor'
        , basePath: 'epiceditor'
        , localStorageName: 'epiceditor'
        , file: { name: opts.container || 'epiceditor' // Use the container's ID for an unique persistent file name - will be overwritten if passed a file.name opt
          , defaultContent: ''
          , autoSave: 100 // Set to false for no auto saving
          }
        , theme: { base: '/themes/base/epiceditor.css'
          , preview: '/themes/preview/github.css'
          , editor: '/themes/editor/epic-dark.css'
          }
        , focusOnLoad: false
        , shortcut: { modifier: 18 // alt keycode
          , fullscreen: 70 // f keycode
          , preview: 80 // p keycode
          , edit: 79 // o keycode
          }
        , parser: typeof marked == 'function' ? marked : null
        }
      , defaultStorage;

    self.settings = _mergeObjs(true, defaults, opts);

    if (!(typeof self.settings.parser == 'function' && typeof self.settings.parser('TEST') == 'string')) {
      self.settings.parser = function (str) {
        return str;
      }
    }

    // Protect the id and overwrite if passed in as an option
    // TODO: Put underscrore to denote that this is private
    self.instanceId = 'epiceditor-' + Math.round(Math.random() * 100000);

    self._canSave = true;

    // Setup local storage of files
    self._defaultFileSchema = function () {
      return {
        content: self.settings.file.defaultContent
      , created: new Date()
      , modified: new Date()
      }
    }

    if (localStorage) {
      if (!localStorage[self.settings.localStorageName]) {
        // TODO: Needs a dynamic file name!
        defaultStorage = {};
        defaultStorage[self.settings.file.name] = self._defaultFileSchema();
        defaultStorage = JSON.stringify(defaultStorage);
        localStorage[self.settings.localStorageName] = defaultStorage;
      }
      else if (JSON.parse(localStorage[self.settings.localStorageName])[self.settings.file.name] === undefined) {
        _defaultFile = JSON.parse(localStorage[self.settings.localStorageName])[self.settings.file.name];
        _defaultFile = self._defaultFileSchema();
        _defaultFile.content = self.settings.file.defaultContent;
      }
      else {
        self.content = self.settings.file.defaultContent;
      }
    }
    // Now that it exists, allow binding of events if it doesn't exist yet
    if (!self.events) {
      self.events = {};
    }

    if (typeof self.settings.container == 'string') {
      self.element = document.getElementById(self.settings.container);
    }
    else if (typeof self.settings.container == 'object') {
      self.element = self.settings.container;
    }

    return this;
  }
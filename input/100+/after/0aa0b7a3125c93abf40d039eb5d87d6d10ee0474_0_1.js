function EpicEditor(options) {
    // Default settings will be overwritten/extended by options arg
    var self = this
      , opts = options || {}
      , _defaultFileSchema
      , _defaultFile
      , defaults = { container: 'epiceditor'
        , basePath: 'epiceditor'
        , localStorageName: 'epiceditor'
        , file: { name: null
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


    // Grab the container element and save it to self.element
    // if it's a string assume it's an ID and if it's an object
    // assume it's a DOM element
    if (typeof self.settings.container == 'string') {
      self.element = document.getElementById(self.settings.container);
    }
    else if (typeof self.settings.container == 'object') {
      self.element = self.settings.container;
    }
    
    // Figure out the file name. If no file name is given we'll use the ID.
    // If there's no ID either we'll use a namespaced file name that's incremented
    // based on the calling order. As long as it doesn't change, drafts will be saved.
    if (!self.settings.file.name) {
      if (typeof self.settings.container == 'string') {
        self.settings.file.name = self.settings.container;
      }
      else if (typeof self.settings.container == 'object') {
        if (self.element.id) {
          self.settings.file.name = self.element.id;
        }
        else {
          if (!EpicEditor._data.unnamedEditors) {
            EpicEditor._data.unnamedEditors = [];
          }
          EpicEditor._data.unnamedEditors.push(self);
          self.settings.file.name = '__epiceditor-untitled-' + EpicEditor._data.unnamedEditors.length;
        }
      }
    }

    // Protect the id and overwrite if passed in as an option
    // TODO: Put underscrore to denote that this is private
    self._instanceId = 'epiceditor-' + Math.round(Math.random() * 100000);

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

    return this;
  }
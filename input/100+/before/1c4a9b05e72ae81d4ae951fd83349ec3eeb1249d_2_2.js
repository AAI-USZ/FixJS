function($, global, undefined) {
  'use strict';

  var pluginName = 'stone';

  /**
   * Plugin default parameters.
   *  enableEngines: Storage engine names for plugin.
   *  saveStrategy: Save mode of storage[fallback, all].
   *  syncBufferLimit: bufferd data number.
   * @type {Object.<string,*>}
   */
  var defaults = {
    dataScheme: 'jqstone',
//    enableEngines: ['localStorage', 'cookie'],
    enableEngines: [],
    saveStrategy: 'fallback',
    syncBufferLimit: 0,  // 0: realtime[default]
  };

  /**
   * Registered available engines.
   * @type {Object.<string, Object>}
   */
  var engines = {};

  // Storage event signature.
  // StorageEvent(key, oldValue, newValue, url, storageArea, callback);
  // jQuery.Event, jQuery.trigger.

  /**
   * Plugin constructor.
   * @param {Object} options A plugin options.
   * @constructor
   */
  function Plugin(options) {
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._buffer = {};
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // TODO: initialize.
      var engine = this.options.enableEngines[0];
      this.database = engines[engine];
    },
    /**
     * get value by key from buffer cache or storage.
     * @param {string} key The stored key.
     * @param {Object.<string,*>=} options The plugin and storage options.
     * @return {*} stored value.
     */
    get: function(key, options) {
      var opts = $.extend({}, options),
          keyPath = this.getDataUrl(key),
          data = null;
      if (keyPath in this._buffer) {
        data = this._buffer[keyPath];
      } else if (this.database) {
        data = this.database.get(keyPath, opts);
      }
      if (data) {
        if (data.timestamp && data.timestamp < Date.now()) {
          this.database.remove(keyPath);
          delete this._buffer[keyPath];
          data = null;
        } else {
          this._buffer[keyPath] = data;
        }
      }
      return ($.isPlainObject(data) ? data.value : null);
    },
    /**
     * store key:value to storage.
     * @param {(string|Object.<string,*>)} key
     *    The stored key OR key:value object.
     * @param {(*|Object.<string,*>=)} value
     *    The stored value OR plugin and storage options.
     * @param {Object.<string,*>=} options
     *    The plugin and storage options.
     */
    set: function(key, value, options) {
      /*!
       * {value, expires || timestamp, [path, domain, secure]}
       */
      var opts = $.extend({}, options),
          keyPath = this.getDataUrl(key),
          expires = opts.expires,
          data = {value: (typeof value === 'undefined') ? null : value};
      if (expires instanceof Date) {
        data.timestamp = expires.getTime();
      } else if (typeof expires === 'number') {
        var time = new Date();
        time.setTime(time.getTime() + expires);
        data.timestamp = time.getTime();
      }
      this.database && this.database.set(keyPath, data, opts);
      this._buffer[keyPath] = data; // Refresh cache.
      return this;
    },
    /**
     * Remove value from storage and cache by key.
     * @param {string} key The stored key.
     * @param {Object.<string,*>=} options The plugin and storage options.
     */
    remove: function(key, options) {
      // TODO: remove item from storage.
      var keyPath = this.getDataUrl(key);
      this.database && this.database.remove(keyPath, options);
      delete this._buffer[keyPath];
      return this;
    },
    /**
     * Clear values in storage and cache.
     */
    clear: function() {
      // TODO: clear storage.
      var dataUrl = this.getDataUrl(''),
          pattern = dataUrl ? new RegExp(dataUrl) : null;
      this.database && this.database.clear(pattern);
      this._buffer = {};
      return this;
    },
    getDataUrl: function(key) {
      var dataScheme = this.options.dataScheme;
      return dataScheme ? (dataScheme + '://' + key) : key;
    },
    _dumpCache: function() {
      return this._buffer;
    }
  };

  /*!
   * Plugin functions.
   */
  $[pluginName] = {
    _defaults: function() {
      return defaults;
    },
    _getEngines: function() {
      return engines;
    },
    availableEngines: function() {
      return $.map(engines, function(v, k) { return k; });
    },
    unregisterStorageEngine: function(name) {
      delete engines[name];
    },
    registerStorageEngine: function(name, object) {
      if (object.isAvailable()) {
        engines[name] = object;
      }
    },
    create: function(options) {
      return new Plugin(options);
    }
  };
}
function(_super) {

  __extends(Chunk, _super);

  Chunk.name = 'Chunk';

  function Chunk() {
    return Chunk.__super__.constructor.apply(this, arguments);
  }

  Chunk.prototype.load = function() {
    Chunk.__super__.load.apply(this, arguments);
    if (this._src) {
      return this.loadScript(this._src);
    }
  };

  Chunk.prototype.loadElement = function(tag, attributes, text, callback) {
    var el;
    el = new Element(tag, attributes, text);
    this.context.addHeadElement(el);
    if (callback) {
      callback();
    }
    return el;
  };

  Chunk.prototype.setTitle = function(title) {
    return this.loadElement('title', {}, title);
  };

  Chunk.prototype.setMetaHeader = function(attributes, content) {
    if (typeof attributes === 'string') {
      attributes = {
        'http-equiv': attributes,
        content: content
      };
    }
    return this.loadElement('meta', attributes);
  };

  Chunk.prototype.setMeta = function(attributes, content) {
    if (typeof attributes === 'string') {
      attributes = {
        name: attributes,
        content: content
      };
    }
    return this.loadElement('meta', attributes);
  };

  Chunk.prototype.setManifest = function(src) {
    return this.context.addManifest(src);
  };

  Chunk.prototype.loadScript = function(attributes, callback) {
    var text;
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    attributes.type = 'text/javascript';
    attributes.charset = 'utf8';
    if (this.context.inlineScripts) {
      text = soma.files[attributes.src];
      attributes['data-src'] = attributes.src;
      delete attributes.src;
    } else {
      attributes['data-loading'] = 'loading';
      attributes['onload'] = "this.removeAttribute('data-loading');";
    }
    return this.loadElement('script', attributes, text, callback);
  };

  Chunk.prototype.loadStylesheet = function(attributes) {
    var tag, text;
    if (typeof attributes === 'string') {
      attributes = {
        href: attributes
      };
    }
    if (this.context.inlineStylesheets) {
      tag = 'style';
      text = soma.files[attributes.href];
      attributes['data-href'] = attributes.href;
      delete attributes.href;
    } else {
      attributes.rel = 'stylesheet';
    }
    attributes.type = 'text/css';
    attributes.charset = 'utf8';
    return this.loadElement('link', attributes, text);
  };

  Chunk.prototype.loadTemplate = function(attributes) {
    var text;
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    text = soma.files[attributes.src];
    attributes['data-src'] = attributes.src;
    delete attributes.src;
    attributes.type = 'text/plain';
    attributes.charset = 'utf8';
    this.loadElement('script', attributes, text);
    return text;
  };

  Chunk.prototype.loadImage = function(attributes) {
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    attributes['data-loading'] = 'loading';
    attributes['onload'] = "this.removeAttribute('data-loading');";
    return this.loadElement('img', attributes);
  };

  Chunk.prototype.loadData = function(options) {
    var context, done, result, _error, _success,
      _this = this;
    result = {};
    _success = options.success;
    _error = options.error;
    done = this.wait();
    options.success = function(data) {
      var key, _i, _len;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        key = data[_i];
        result[key] = data[key];
      }
      if (_success) {
        _success(data);
      }
      return done();
    };
    options.error = function(status, response) {
      if (_error) {
        _error(status, response, options);
      } else {
        _this.emit('error', 'requireData', status, response, options);
      }
      return done();
    };
    context = new soma.InternalContext(this.context, options);
    context.begin();
    return result;
  };

  return Chunk;

}
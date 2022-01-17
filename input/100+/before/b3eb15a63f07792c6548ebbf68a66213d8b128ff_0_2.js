function(_super) {

  __extends(Chunk, _super);

  Chunk.name = 'Chunk';

  function Chunk() {
    return Chunk.__super__.constructor.apply(this, arguments);
  }

  Chunk.prototype.complete = function() {
    this.el || (this.el = $(this.html));
    return this.el.data('view', this);
  };

  Chunk.prototype.loadElement = function(tag, attributes, text, callback) {
    var done, el, url, urlAttr,
      _this = this;
    urlAttr = (tag === 'img' || tag === 'script' ? 'src' : 'href');
    url = attributes[urlAttr];
    if (url) {
      el = $("head [" + urlAttr + "=\"" + url + "\"], head [data-" + urlAttr + "=\"" + url + "\"]");
    }
    if (el.length) {
      if ('type' in attributes && attributes.type !== el.attr('type')) {
        el.detach().attr('type', attributes.type).appendTo($('head'));
      }
    } else {
      el = $(document.createElement(tag));
      if ('type' in attributes) {
        if (!url) {
          el.text(text);
        } else if (attributes.type === 'text/javascript') {
          el.attr('defer', 'defer');
        } else {
          el.attr("data-" + urlAttr, url);
          delete attributes[urlAttr];
          $.ajax({
            method: 'GET',
            url: "" + url,
            type: 'html',
            success: function(text) {
              el.text(text);
              return el.trigger('load');
            },
            error: function(xhr, status, e, data) {
              return el.trigger('error');
            }
          });
        }
        $('head').append(el);
      }
      if (url && url.substr(0, 5) !== 'data:') {
        el.attr('data-loading', 'loading');
        el.bind('load error', function() {
          return el.removeAttr('data-loading');
        });
      }
      el.attr(attributes);
    }
    if (el.attr('data-loading')) {
      done = this.wait(callback);
      el.bind('load', function() {
        return done(el);
      });
      el.bind('error', function() {
        _this.emit('error', 'loadElement', tag, attributes, text);
        return done(el);
      });
    } else if (callback) {
      callback(el);
    }
    return el;
  };

  Chunk.prototype.setTitle = function(title) {
    return $('title').text(title);
  };

  Chunk.prototype.setMeta = function(attributes, value) {
    var el, name;
    if (typeof attributes === 'string') {
      name = attributes;
      attributes = {
        name: name,
        value: value
      };
    }
    el = $("meta[name=\"" + attributes.name + "\"]");
    if (!el.length) {
      el = $(document.createElement('meta'));
      $('head').append(el);
    }
    el.attr(attributes);
    return el;
  };

  Chunk.prototype.loadScript = function(attributes, callback) {
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    attributes.type = 'text/javascript';
    return this.loadElement('script', attributes, null, callback);
  };

  Chunk.prototype.loadStylesheet = function(attributes) {
    if (typeof attributes === 'string') {
      attributes = {
        href: attributes
      };
    }
    attributes.type = 'text/css';
    attributes.rel = 'stylesheet';
    return this.loadElement('link', attributes);
  };

  Chunk.prototype.loadTemplate = function(attributes) {
    var el;
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    attributes.type = 'text/html';
    el = this.loadElement('script', attributes);
    el.toString = function() {
      return el.html();
    };
    return el;
  };

  Chunk.prototype.loadImage = function(attributes) {
    var el;
    if (typeof attributes === 'string') {
      attributes = {
        src: attributes
      };
    }
    el = this.loadElement('img', attributes);
    el.toString = function() {
      return el.outerHTML();
    };
    return el;
  };

  Chunk.prototype.loadData = function(options) {
    var done, result, _error, _success,
      _this = this;
    result = {};
    done = this.wait();
    _success = options.success;
    _error = options.error;
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
    options.error = function(xhr) {
      if (_error) {
        _error(xhr.status, xhr.response, options);
      } else {
        _this.emit('error', 'requireData', xhr.status, xhr.response, options);
      }
      return done();
    };
    $.ajaj(options);
    return result;
  };

  return Chunk;

}
function() {

    GraphObject.props = {};

    GraphObject._changed_keys = [];

    function GraphObject(path, options) {
      var _ref;
      this.path = path;
      this.options = options;
      this.sync(this.path);
      if ((_ref = this.options) == null) {
        this.options = {};
      }
    }

    GraphObject.prototype.get = function(name, default_value) {
      if (name in this.props) {
        default_value = this.props[name];
      }
      return default_value;
    };

    GraphObject.prototype.set = function(name, value) {
      if (this.get(name) !== value) {
        this._changed_keys[this._changed_keys.length] = name;
      }
      return this.props[name] = value;
    };

    GraphObject.prototype.save = function() {
      throw "save methods are not supported yet.";
    };

    GraphObject.prototype.sync = function(path, options) {
      var dfd,
        _this = this;
      dfd = new jQuery.Deferred;
      if (path == null) {
        path = this.path;
      }
      if (options == null) {
        options = this.options;
      }
      FB.api(path, options, function(response) {
        if (_this.is_error_response(response)) {
          return dfd.reject(_this, response);
        } else {
          if ("data" in response) {
            _this.props = response.data;
          } else {
            _this.props = response;
          }
          if (_this.validate()) {
            return dfd.resolve(_this);
          } else {
            return dfd.reject(_this);
          }
        }
      });
      return dfd.promise();
    };

    GraphObject.prototype.request = function(path, options) {
      var dfd,
        _this = this;
      dfd = new jQuery.Deferred;
      path = "" + this.path + path;
      if (options == null) {
        options = this.options;
      }
      FB.api(path, options, function(response) {
        var ret;
        if (_this.is_error_response(response)) {
          return dfd.reject(_this, response);
        } else {
          if ("data" in response) {
            ret = response.data;
          } else {
            ret = response;
          }
          return dfd.resolve(ret);
        }
      });
      return dfd.promise();
    };

    GraphObject.prototype.validate = function() {
      return false;
    };

    GraphObject.prototype.is_error_response = function(response) {
      return "error" in response;
    };

    return GraphObject;

  }
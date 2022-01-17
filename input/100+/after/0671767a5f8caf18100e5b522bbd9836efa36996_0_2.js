function SwaggerResource(resourceObj, api) {
      var parts,
        _this = this;
      this.api = api;
      this.path = this.api.resourcePath != null ? this.api.resourcePath : resourceObj.path;
      this.description = resourceObj.description;
      parts = this.path.split("/");
      this.name = parts[parts.length - 1].replace('.{format}', '');
      this.basePath = this.api.basePath;
      this.operations = {};
      this.operationsArray = [];
      if ((resourceObj.operations != null) && (this.api.resourcePath != null)) {
        this.api.progress('reading resource ' + this.name + ' operations');
        this.addOperations(resourceObj.path, resourceObj.operations);
        this.api[this.name] = this;
      } else {
        if (this.path == null) {
          this.api.fail("SwaggerResources must have a path.");
        }
        this.url = this.api.suffixApiKey(this.api.basePath + this.path.replace('{format}', 'json'));
        this.api.progress('fetching resource ' + this.name + ': ' + this.url);
        jQuery.getJSON(this.url, function(response) {
          var endpoint, _i, _len, _ref;
          if ((response.basePath != null) && jQuery.trim(response.basePath).length > 0) {
            _this.basePath = response.basePath;
            _this.basePath = _this.basePath.replace(/\/$/, '');
          }
          if (response.apis) {
            _ref = response.apis;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              endpoint = _ref[_i];
              _this.addOperations(endpoint.path, endpoint.operations);
            }
          }
          _this.api[_this.name] = _this;
          _this.ready = true;
          return _this.api.selfReflect();
        }).error(function(error) {
          return _this.fail(error.status + ' : ' + error.statusText + ' ' + _this.url);
        });
      }
    }
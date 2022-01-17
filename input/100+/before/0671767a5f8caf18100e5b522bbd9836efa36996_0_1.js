function(response) {
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
          _this.ready = true;
          return _this.api.selfReflect();
        }
function() {
      var data, _i, _len, _ref, _results;
      this.data = window.loaded_objects.scene;
      this.textures = window.loaded_objects.textures;
      this.initTextures();
      console.log(this.textures);
      _ref = this.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        _results.push(this.bufferObject(data));
      }
      return _results;
    }
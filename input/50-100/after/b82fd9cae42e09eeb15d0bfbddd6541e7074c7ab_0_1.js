function() {
      var texture, _i, _len, _ref, _results;
      this.textureBuffers = [];
      _ref = this.textures;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        texture = _ref[_i];
        _results.push(this.textureBuffers[this.textureBuffers.length] = this.initTexture(texture["src"]));
      }
      return _results;
    }
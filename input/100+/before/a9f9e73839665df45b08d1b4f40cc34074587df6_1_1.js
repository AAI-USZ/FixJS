function Graph(edgeWeights) {
      var tuple, vertex1, vertex2, weight, weightless, _base, _base1, _base2, _base3, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
      this.edgeWeights = edgeWeights != null ? edgeWeights : [];
      weightless = this._weightlessGraph();
      this._distanceBetween = {};
      this._neighbours = {};
      _ref = this.edgeWeights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tuple = _ref[_i];
        vertex1 = tuple[0], vertex2 = tuple[1], weight = tuple[2];
        if (weightless) {
          weight = 1;
        }
        if ((_ref1 = (_base = this._distanceBetween)[vertex1]) == null) {
          _base[vertex1] = {};
        }
        if ((_ref2 = (_base1 = this._distanceBetween)[vertex2]) == null) {
          _base1[vertex2] = {};
        }
        this._distanceBetween[vertex1][vertex2] = weight;
        this._distanceBetween[vertex2][vertex1] = weight;
        if ((_ref3 = (_base2 = this._neighbours)[vertex1]) == null) {
          _base2[vertex1] = [];
        }
        if ((_ref4 = (_base3 = this._neighbours)[vertex2]) == null) {
          _base3[vertex2] = [];
        }
        if (vertex1 !== vertex2) {
          this._neighbours[vertex1].push(vertex2);
          this._neighbours[vertex2].push(vertex1);
        }
      }
    }
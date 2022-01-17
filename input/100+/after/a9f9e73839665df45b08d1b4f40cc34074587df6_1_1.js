function Graph(tuples) {
      var isWeightless,
        _this = this;
      if (tuples == null) {
        tuples = [];
      }
      this._edgeWeights = this._assignLabels(tuples);
      this._idMap = this._makeIdMap(tuples);
      isWeightless = this._weightlessGraph();
      this._distanceBetween = {};
      this._neighbours = {};
      this._eachTuple(this._edgeWeights, function(vertex1, vertex2, weight) {
        var _base, _base1, _base2, _base3, _ref, _ref1, _ref2, _ref3;
        if (isWeightless) {
          weight = 1;
        }
        if ((_ref = (_base = _this._distanceBetween)[vertex1]) == null) {
          _base[vertex1] = {};
        }
        if ((_ref1 = (_base1 = _this._distanceBetween)[vertex2]) == null) {
          _base1[vertex2] = {};
        }
        _this._distanceBetween[vertex1][vertex2] = weight;
        _this._distanceBetween[vertex2][vertex1] = weight;
        if ((_ref2 = (_base2 = _this._neighbours)[vertex1]) == null) {
          _base2[vertex1] = [];
        }
        if ((_ref3 = (_base3 = _this._neighbours)[vertex2]) == null) {
          _base3[vertex2] = [];
        }
        if (vertex1 !== vertex2) {
          _this._neighbours[vertex1].push(vertex2);
          return _this._neighbours[vertex2].push(vertex1);
        }
      });
    }
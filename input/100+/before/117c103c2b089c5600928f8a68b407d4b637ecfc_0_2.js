function SelectedPositions( fromValues ) {
    var axisprefix = 'axis:';
    // the values at index 0 servs as the referencial position. Values at other indexes will be
    // only for multiple values of a given single axis
    this.matrix = [];
    if (fromValues != null && fromValues.length > 0) {
      this.matrix[0] = [];
      for (var i = 0; i < fromValues.length; i++) {
        this.matrix[0][axisprefix + fromValues[i].axisId] = fromValues[i];
      }
    }
    
    this.put = function( positionIndex, axisId, value ) {
      if (this.matrix[positionIndex] == null)
        this.matrix[positionIndex] = [];
      this.matrix[positionIndex][axisprefix + axisId] = value;
      for (var i = 1; i < positionIndex; i++) {
        if (this.matrix[i] == null)
          this.matrix[i] = [];
      }
    }
    
    this.remove = function( positionIndex, axisId ) {
      this.matrix[positionIndex][axisprefix + axisId] = null;
    }
    
    this.clear = function() {
      this.matrix = [];
    }
    
    this.at = function( positionIndex, axisId ) {
      if (this.matrix[positionIndex] != null)
        return this.matrix[positionIndex][axisprefix + axisId];
      return null;
    }
    
    this.all = function() {
      var positions = [];
      
      function contains(position) {
        for (var ipos in positions)
          if (position.values.length == positions[ipos].values.length) {
            var ok = true;
            for (var ival = 0; ival < position.values.length && ok; ival++) {
              if (position.values[ival].axisId != positions[ipos].values[ival].axisId ||
                  position.values[ival].id != positions[ipos].values[ival].id)
                ok = false;
            }
            if (ok)
              return true;
          }
        return false;
      }

      positions[0] = {values: []};
      for (var axisId in this.matrix[0]) {
        if (this.matrix[0][axisId] != null)
          positions[0].values.push(aPositionValueFrom(this.matrix[0][axisId]))
      }
      sortValues(positions[0].values);
      for (var i = 1; i < this.matrix.length; i++) {
        for (axisId in this.matrix[i]) {
          if (this.matrix[i][axisId] != null) {
            var lastpos = positions.length;
            for (var pos = 0; pos < lastpos; pos++) {
              var newPosition = {values: [ aPositionValueFrom(this.matrix[i][axisId]) ]};
              for (var val = 0; val < positions[pos].values.length; val++) {
                if (positions[pos].values[val].axisId != axisId.substring(axisprefix.length))
                  newPosition.values.push(positions[pos].values[val]);
              }
              sortValues(newPosition.values);
              if (!contains(newPosition)) {
                positions.push(newPosition);
              }
            }
          }
        }
      }
      return positions;
    }
    
    this.size = function() {
      return this.matrix.length;
    }
  }
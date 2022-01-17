function( positionIndex, axisId, value ) {
      if (this.matrix[positionIndex] == null)
        this.matrix[positionIndex] = {};
      this.matrix[positionIndex][axisprefix + axisId] = value;
      for (var i = 1; i < positionIndex; i++) {
        if (this.matrix[i] == null)
          this.matrix[i] = {};
      }
    }
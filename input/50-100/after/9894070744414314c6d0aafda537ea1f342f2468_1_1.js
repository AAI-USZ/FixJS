function computeLocalMatrix() {
    if( this._cachedLocalMatrixIsValid ) {
      return this._cachedLocalMatrix;
    } else {
      math.transform.compound( this.position.buffer, this.rotation.buffer, this.scale.buffer, this._cachedLocalMatrix.buffer);
      this._cachedLocalMatrixIsValid = true;
      return this._cachedLocalMatrix;
    }
  }
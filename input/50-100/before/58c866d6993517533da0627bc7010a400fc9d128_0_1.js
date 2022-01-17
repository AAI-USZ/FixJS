function computeLocalMatrix() {
    if( this._cachedLocalMatrixIsValid ) {
      return this._cachedLocalMatrix;
    } else {
      math.transform.fixed( this.position, this.rotation, this.scale, this._cachedLocalMatrix );
      this._cachedLocalMatrixIsValid = true;
      return this._cachedMatrix;
    }
  }
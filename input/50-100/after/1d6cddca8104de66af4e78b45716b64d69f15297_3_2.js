function computeLocalMatrix() {
    if( this._cachedLocalMatrixIsValid ) {
      return this._cachedLocalMatrix;
    } else {
      math.transform.set(this._cachedLocalMatrix.buffer, this.position.buffer, this.rotation.buffer, this.scale.buffer);
      this._cachedLocalMatrixIsValid = true;
      return this._cachedLocalMatrix;
    }
  }
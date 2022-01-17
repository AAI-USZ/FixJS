function computeWorldMatrix() {
    if( this.owner && this.owner.parent && 
        this.owner.parent.hasComponent( "Transform" ) ) {
      var parentTransform = this.owner.parent.findComponent( "Transform" );                            
      math.matrix4.multiply( computeLocalMatrix.call( this).buffer, parentTransform.worldMatrix().buffer,
        this._cachedWorldMatrix.buffer );
    } else {
      math.matrix4.set( this._cachedWorldMatrix.buffer, computeLocalMatrix.call( this).buffer );
    }
    return this._cachedWorldMatrix;
  }
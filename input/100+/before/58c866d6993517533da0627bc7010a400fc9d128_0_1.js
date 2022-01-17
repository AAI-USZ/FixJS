function computeWorldMatrix() {
    if( this.owner && this.owner.parent && 
        this.owner.parent.hasComponent( "Transform" ) ) {
      var parentTransform = this.owner.parent.findComponent( "Transform" );                            
      math.matrix4.multiply( computeLocalMatrix.call( this ), parentTransform.worldMatrix(), 
        this._cachedWorldMatrix );
    } else {
      math.matrix4.set( this._cachedWorldMatrix, computeLocalMatrix.call( this ) );
    }
    return this._cachedWorldMatrix;
  }
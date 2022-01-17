function( chunk, context, bodies, params ){
    if( params && params.cond ){
      var cond = params.cond;
      cond = this.tap(cond, chunk, context);
      // eval expressions with no dust references
      if( eval( cond ) ){
       return chunk.render( bodies.block, context );
      }
      if( bodies['else'] ){
       return chunk.render( bodies['else'], context );
      }
    }
    // no condition
    else {
      _console.log( "No expression given!" );
    }
    return chunk;
  }
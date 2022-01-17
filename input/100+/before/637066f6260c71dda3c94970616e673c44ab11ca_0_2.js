function( chunk, context, bodies, params ){
    if( params && params.cond ){
      var cond = params.cond;

      // resolve dust references in the expression
      if( typeof cond === "function" ){
        cond = '';
        chunk.tap( function( data ){
          cond += data;
          return '';
        } ).render( params.cond, context ).untap();
        if( cond === '' ){
          cond = false;
        }
      }
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
      if( typeof window !== 'undefined' && window.console ){
        window.console.log( "No expression given!" );
      }
    }
    return chunk;
  }
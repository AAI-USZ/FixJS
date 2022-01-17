function(chunk, context, bodies, params) {
    if( params && params.key){
      var key = params.key;
      key = this.tap(key, chunk, context);
      if( key ){
        return chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, value: context.get(key) }));
      }
      return chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, value: context.get(params.key) }));
    }
    // no key
    else {
      _console.log( "No expression given!" );
    }
    return chunk;
  }
function(chunk, context, bodies, params) {
    if( params && params.key){
      var key = params.key;
      key = this.tap(key, chunk, context);
      return chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, value: context.get(key) }));
    }
    // no key
    else {
      _console.log( "No key given for the select tag!" );
    }
    return chunk;
  }
function(chunk, context, bodies) {
    _console.log(JSON.stringify(context.stack));
    return chunk;
  }
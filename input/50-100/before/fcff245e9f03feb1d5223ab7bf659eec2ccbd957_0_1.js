function(status, stream){
  if(status >= 400){
    if(config.error[status]){
      stream.emit('error',{code: status, definition: config.error[status].definition, description: config.error[status].description});
    } else {
      stream.emit('error',{code: status, definition: 'Unrecognized error', description: 'Sorry. We dont know the kind of error. Check Twitter docs: https://dev.twitter.com/docs/error-codes-responses'});
    }

    stream.emit('http error', status);
  }
}
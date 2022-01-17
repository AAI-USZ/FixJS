function( chan /*, pass, callback*/ ) {
  /** My kingdom for proper overloading. This one has 4 signatures:
   *    join( chan, pass, callback )
   *    join( chan, pass )
   *    join( chan, cb )
   *    join( chan )
   *  I'm not JS enough to do it nicely, I'll just count them and prod a bit.
   */
  var channel_ = this.channels.get( chan.id || objects.id( chan ) )
    , password = null
    , callback = null
  switch ( arguments.length ) {
    case 3:
      password = arguments[ 1 ]
      callback = arguments[ 2 ]
      break
    case 2:
      // Either (chan, pass) or (chan, callback)
      if ( arguments[ 1 ].constructor === String )  // >_<
        password = arguments[ 1 ]
      else
        callback = arguments[ 1 ]
      break
    case 1:
      break
    default:
      throw new Error( "No matching signature" )
  }

  // We are already in it, but tell callback anyway, if there is one
  if ( channel_ ) {
    if ( callback )
      callback( channel_ )
    return channel_
  }
  // We got a proper Channel object, and this client's User is in it
  // That's the somewhat convoluted way of telling ourselves we've joined
  else if ( chan instanceof Channel
      && chan.people.has( this.user.id ) ) {
    this.channels.set( chan.id, chan )
    return chan
  }

  // All else failed, so construct and send a JOIN message
  const params = []
  if ( password )
    params.push( password )
  if ( callback )
    params.push( callback )
  if ( ! ( chan instanceof Channel ) )
    chan = channel( chan )
  return chan.for( this ).join.apply( chan, params )
}
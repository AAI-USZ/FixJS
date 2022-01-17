function( irc, key, callback ) {
  const prms = [ this.name ]
  if ( arguments.length === 2 ) {
    callback = key instanceof Function ? key : null
    key = callback ? null : key
  }
  if ( callback )
    anticipateJoin.call( this, irc, callback )
  if ( key )
    prms.push( key )
  irc.send( message( COMMAND.JOIN, prms ) )
  return this
}
function( client, key, callback ) {
  const params = [ this.name ]
  if ( arguments.length === 2 ) {
    callback = key instanceof Function ? key : null
    key = callback ? null : key
  }
  if ( callback )
    anticipateJoin.call( this, client, callback )
  if ( key )
    params.push( key )
  client.send( message( COMMAND.JOIN, params ) )
  return this
}
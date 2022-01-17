function( irc, txt ) {
  const chan   = irc.channels.get( this )
      , params = [ chan ]
  if ( ! chan ) // WAT DO
    return
  if ( txt )
    params.push( trailing( txt ) )
  irc.send( message( COMMAND.PART, params ) )
  return this
}
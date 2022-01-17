function( irc, txt ) {
  const chan   = irc.channels.get( this )
      , params = [ chan ]
  if ( ! chan ) // WAT DO
    return
  if ( txt )
    params.push( trailing( txt ) )
  irc.part.apply( irc, params )
  return this
}
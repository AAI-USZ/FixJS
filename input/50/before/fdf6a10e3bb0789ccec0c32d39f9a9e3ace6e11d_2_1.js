function( irc ) {
  this.reply = reply.bind( this, irc )
  this.send  = send.bind( this, irc )
  return this
}
function( client ) {
  this.reply = reply.bind( this, client )
  this.send  = send.bind( this, client )
  return this
}
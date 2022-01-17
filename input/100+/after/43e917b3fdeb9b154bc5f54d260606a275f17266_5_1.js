function( irc ) {
  this.invite   = invite.bind( this, irc )
  this.join     = join.bind( this, irc )
  this.kick     = kick.bind( this, irc )
  this.part     = part.bind( this, irc )
  this.notify   = notify.bind( this, irc )
  this.say      = say.bind( this, irc )
  this.setMode  = setMode.bind( this, irc )
  this.setTopic = setTopic.bind( this, irc )
  return this
}
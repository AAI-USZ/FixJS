function( irc ) {
  this.inviteTo = invite.bind( this, irc )
  this.kickFrom = kick.bind( this, irc )
  this.notify   = notify.bind( this, irc )
  this.tell     = say.bind( this, irc )
  return this
}
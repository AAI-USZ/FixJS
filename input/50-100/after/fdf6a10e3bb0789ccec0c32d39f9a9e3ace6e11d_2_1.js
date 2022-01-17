function( client ) {
  this.inviteTo = invite.bind( this, client )
  this.kickFrom = kick.bind( this, client )
  this.notify   = notify.bind( this, client )
  this.tell     = say.bind( this, client )
  return this
}
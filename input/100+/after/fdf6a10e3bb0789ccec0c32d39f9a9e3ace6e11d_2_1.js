function( client ) {
  this.invite   = invite.bind( this, client )
  this.join     = join.bind( this, client )
  this.kick     = kick.bind( this, client )
  this.part     = part.bind( this, client )
  this.notify   = notify.bind( this, client )
  this.say      = say.bind( this, client )
  this.setMode  = setMode.bind( this, client )
  this.setTopic = setTopic.bind( this, client )
  return this
}
function( conf ) {
  const config    = getConfig( conf )
      , server    = config.server
      , internal  =
        { buffer: []
        , connected: false
        , connectedSince: null
        , queue: [] /** @todo {jonas} Implement queueing and backoff for ALL THE THINGS */
        , socket: null
        }

  logger.level = LEVEL.fromString( config["log"] )

  this.config     = config

  this.server     = new Server( server.address, server.port )
  this.user       = new Person( config["nick"], null, null )

  this.channels   = new Map()
  this.observers  = Observable.of( this ).for( this )

  // Priviliged methods
  this.connect        = connect.bind( this, internal )
  this.disconnect     = disconnect.bind( this, internal )
  this.send           = send.bind( this, internal )
}
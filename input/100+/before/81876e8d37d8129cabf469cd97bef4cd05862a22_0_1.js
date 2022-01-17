function connect ( hollaback ) {
  // Client setup
  var not_open
  if ( typeof IRCExposeInternals != 'undefined' || !this._internal.socket || ( not_open = ( [ 'open', 'opening' ].indexOf( this._internal.socket.readyState ) < 0 ) ) ) {
    if ( typeof IRCExposeInternals == 'undefined' ) {
      if ( this._internal.socket != null ) {
        this._internal.socket.end()
        this._internal.socket.removeAllListeners()
        this._internal.socket = null
      }

      if ( this.options.ssl )
        this._internal.socket = require( 'tls' ).connect( this.options.port, this.options.server )
      else
        this._internal.socket = new require( 'net' ).Socket()
    }

    this._internal.socket.setEncoding( this.options.encoding )
    this._internal.socket.setTimeout( 0 )

    // Forward network errors
    this._internal.socket.on( 'error', function( er ) {
      this._internal.emitter.emit( 'error', er )
      this._internal.emitter.emit( 'error:network', er )
    })

    // Send login commands after connect
    this._internal.socket.on('connect', doConnect.bind( this ) )

    // Receive data
    this._internal.socket.on( 'data', parseMessage.bind( this ) )

    // Timeout
    this._internal.socket.on( 'timeout', doDisconnect.bind( this ) )

    if ( !this.options.ssl )
      this._internal.socket.connect( this.options.port, this.options.server )
  }

  // Holla
  if ( typeof hollaback === 'function' )
    this.once( 'connected', hollaback )

  return this
}
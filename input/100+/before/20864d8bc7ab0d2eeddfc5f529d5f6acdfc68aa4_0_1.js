function( ws, player_name ) {
	ws.on( 'message', this.socket_onMessage );
	ws.on( 'close', this.socket_onClose );

	if( this.index_to_name.length === 0 ) {
		ws.send( JSON.stringify({ type: 'creator' }) );
	}

	this.name_to_index[ player_name ] = this.index_to_name.length;
	this.index_to_name.push( player_name );

	ws.send( JSON.stringify({ type: 'player-list', players: this.index_to_name }) );
	this.broadcast( JSON.stringify({ type: 'player-add', player_name: player_name }) );
	
	this.connections.set( ws, player_name );
	this.players.set( player_name, ws );
}
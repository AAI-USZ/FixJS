function( ws, player_name ) {
	ws.on( 'message', this.socket_onMessage );
	ws.on( 'close', this.socket_onClose );

	var game_now_has_multiple_players = this.index_to_name.length === 1;

	this.name_to_index[ player_name ] = this.index_to_name.length;
	this.index_to_name.push( player_name );

	ws.send( JSON.stringify({ type: 'player-list', players: this.index_to_name }) );
	this.broadcast( JSON.stringify({ type: 'player-add', player_name: player_name }) );
	
	this.connections.set( ws, player_name );
	this.players.set( player_name, ws );
	
	if( game_now_has_multiple_players ) {
		this.players.get( this.index_to_name[0] ).send( JSON.stringify({ type: 'game-allow-start' }) );
	}
}
function( ws ) {
	var player_name = this.connections.delete( ws ), player_index = this.name_to_index[ player_name ];
	
	this.players.delete( player_name );
	
	delete this.name_to_index[ player_name ];
	this.index_to_name.splice( player_index, 1 );
	
	for( var i = player_index; i < this.index_to_name.length; ++i ) {
		this.name_to_index[ this.index_to_name[i] ] = this.name_to_index[ this.index_to_name[i] ] - 1;
	}
	
	this.broadcast( JSON.stringify({ type: 'player-remove', player_name: player_name }) );
		
	if( this.index_to_name.length === 0 ) {
		this.emit( 'empty' );
	}
	else if( player_index === 0 ) {
		this.creator = this.index_to_name[0];
			
		this.emit( 'new-creator', this.creator );
		this.players.get( this.creator ).send( JSON.stringify({ type: 'creator' }) );
	}
}
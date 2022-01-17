function() {
			events.disconnect( this.update_event );
			events.disconnect( this.out_of_bounds_event );
			this.drop();
			core.echo( 'That alien fucked up!' );
			game.aliens.erase( this );
		}
function() {
			game.aliens.each( function( alien, alien_index )
				{
					if( this.contains(alien.pos) ) {
						this.die();
					}
				}.bind(this)
			);
		}
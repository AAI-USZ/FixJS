function() {
			this.parent();

			if (SkeletonJigsaw.NEXT_LEVEL) {
				this.loadLevelDeferred(SkeletonJigsaw.NEXT_LEVEL);
				this.clearStatuses();
			} else {
				var dokuro = this.getEntitiesByType( EntityDokuro )[0];

				if( EntityPiece ) {
					var piece = this.getEntitiesByType( EntityPiece )[0];
				}

				if( dokuro ) {
					// screen follows the player
					this.screen.x = dokuro.pos.x - ig.system.width/2;
					this.screen.y = dokuro.pos.y - ig.system.height/2;
				}

				if ( !dokuro ) {
					if ( this.vignettefade && this.gameover.delta() > 2) {
						if ( !this.vignettegameover ) {
							this.vignettegameover = ig.game.spawnEntity( EntityVignettegameover, this.screen.x, this.screen.y );
							this.actionLock = true;
						}
					}

					if ( !this.vignettegameover && this.gameover.delta() > 0 ) {
						this.vignettefade = ig.game.spawnEntity( EntityVignetteFade, this.screen.x, this.screen.y );
					}
				}
			}
		}
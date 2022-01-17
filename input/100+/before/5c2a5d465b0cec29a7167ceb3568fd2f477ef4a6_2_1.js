function() {
			this.parent();
            console.log(this.getEntitiesByType( EntityVignette ));

			if (ig.game.skeleton.next_level) {
                console.log('next level');

			    if (this.vig) this.vig.kill();
			    if (this.hud) this.hud.kill();

                this.vig = {type: "EntityVignette", x:0, y:0};
                this.hud = {type: "EntityHud", x:0, y:0};

                ig.global[SkeletonJigsaw.getCurrentLevel()].entities.push(this.vig);
                ig.global[SkeletonJigsaw.getCurrentLevel()].entities.push(this.hud);

				this.loadLevelDeferred(ig.game.skeleton.next_level);

                ig.global[SkeletonJigsaw.getCurrentLevel()].entities.pop();
                ig.global[SkeletonJigsaw.getCurrentLevel()].entities.pop();

                this.vig = this.getEntitiesByType(EntityVignette)[0];
                this.hud = this.getEntitiesByType(EntityHud)[0];

                ig.game.skeleton.next_level = 0;
                console.log('null level');
			} else {
				var dokuro = this.getEntitiesByType( EntityDokuro )[0];

				if( EntityPiece ) {
					var piece = this.getEntitiesByType( EntityPiece )[0];
				}

				if( dokuro ) {
					// screen follows the player
					this.screen.x = dokuro.pos.x - ig.system.width/2;
					this.screen.y = dokuro.pos.y - ig.system.height/2;
				} else {
					if ( this.vigfade && this.gameover.delta() > 2) {
						if ( !this.viggameover ) {
							this.viggameover = ig.game.spawnEntity( EntityVignettegameover, this.screen.x, this.screen.y );
							this.actionLock = true;
						}
					}

					if ( !this.viggameover && this.gameover.delta() > 0 ) {
						this.vigfade = ig.game.spawnEntity( EntityVignetteFade, this.screen.x, this.screen.y );
					}
				}
			}
			    console.log(this.vig);
			    console.log(this.hud);
		}
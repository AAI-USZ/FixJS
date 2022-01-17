function (entity)
            {
                this.entity = entity;

                this.pos.x = this.entity.pos.x - this.offset.x;
                this.pos.y = this.entity.pos.y - this.offset.y;

                //TODO took this out because it was causing an issue with the camera not being correct when the player was too close to the bottom
                /*this.trap.pos.x = this.entity.pos.x - this.trap.size.x / 2;
                this.trap.pos.y = this.entity.pos.y - this.trap.size.y;*/
                ig.game.screen.x = this.pos.x;
                ig.game.screen.y = this.pos.y;
            }
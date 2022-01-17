function(){

                if(this.activeWeapon == "none")
                    return;

                if(this.maxPool == -1 || this.pool < this.maxPool )
                {
                    //console.log("Pool", this.pool, this.pool < this.maxPool)
                    var entity = ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip, parentEntity: this} );
                    this.addWeaponToPool();
                    this.maxPool = entity.maxPool;
                    this.shotPressed = entity.automatic;

                    this.fireRate = entity.automatic ? entity.fireRate : 0;

                    //TODO bug where this isn't reapplied if the weapon is automatic
                    var accel = this.standing ? this.accelGround : this.accelAir;
                    if( !this.flip ) {
                        this.accel.x = -accel * entity.recoil;
                    }else {
                        this.accel.x = accel * entity.recoil;
                    }

                    this.fireDelay.reset();
                }
            }
function(){

                if(this.activeWeapon == "none")
                    return;

                this.fireWeapon();
                /*if(this.shotPressed)
                {
                    if( this.fireDelay.delta() > this.fireRate ) {

                        this.fireDelay.reset();
                    }
                }*/
            }
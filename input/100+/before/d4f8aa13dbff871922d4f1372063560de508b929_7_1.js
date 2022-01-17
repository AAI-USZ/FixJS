function()
            {

                if(this.shotPressed)
                {
                    if( this.fireDelay.delta() > this.fireRate ) {
                        this.fireWeapon();
                        this.fireDelay.reset();
                    }
                }

                this.parent();

            }
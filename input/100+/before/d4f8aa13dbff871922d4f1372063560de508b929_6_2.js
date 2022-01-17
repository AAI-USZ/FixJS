function (data)
            {
                if(this.light)
                    ig.game.lightManager.removeLight(this.light);

                // Reset Default Values
                this.defaultInstructions = "none";
                this.showStats = true;
                var defaultWeapon = 1;

                this.currentLevel = data;

                var cameraMinY = 0;//this.showStats ? -16 : 0;

                this.parent(data);

                this.levelCounter++;

                // Track Level
                this.tracking.trackPage("/game/load/level/"+this.currentLevelName);

                // Looks for
                var settings = this.getEntityByName("settings");
                if (settings) {
                    // Set properties supported by game engine if overriden by setting entity
                    if (settings.showStats)
                        this.showStats = settings.showStats == "true" ? true : false;

                    if (settings.defaultInstructions)
                        this.defaultInstructions = settings.defaultInstructions;

                    if (settings.defaultWeapon)
                        defaultWeapon = settings.defaultWeapon;

                    if (settings.cameraMinY)
                        cameraMinY = Number(settings.cameraMinY);

                    //TODO add default weapon settings
                }
                else {
                    // Reset value
                }

                //If there are no stats make sure the player doesn't have a weapon
                if (this.showStats) {
                    //ig.game.stats.ammo = 10;
                    this.player.makeInvincible();

                    //for testing
                    //defaultWeapon = 5;
                    this.player.equip(defaultWeapon, true);
                }

                if (this.defaultInstructions != "none")
                    this.displayCaption(this.defaultInstructions, 7);

            }
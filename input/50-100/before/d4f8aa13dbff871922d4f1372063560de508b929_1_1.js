function (data)
        {

            // Reset Default Values
            this.defaultCaption = ig.config.text.defaultCaption;
            this.showHUD = true;
            var defaultWeapon = 1; //TODO need to think of a better way to handle this

            var cameraMinY = this.showHUD ? this.hudOffset : 0;

            //this.stats = {time:0, deaths:0};
            this.parent(data);

            // Track Level
            this.tracking.trackPage("/game/load/level/" + this.currentLevelName);

            this.levelTimer.reset();

            if (this.defaultCaption != "none")
                this.displayCaption(this.defaultCaption, 7); //TODO need to may the delay configurable

        }
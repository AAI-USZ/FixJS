function (data)
        {

            // Reset Default Values
            //this.defaultCaption = ig.config.text.defaultCaption; //TODO should this be left in here?

            //this.stats = {time:0, deaths:0};
            this.parent(data);

            // Track Level
            this.tracking.trackPage("/game/load/level/" + this.currentLevelName);

            this.levelTimer.reset();

            //TODO this could be cleaned up a little better
            if(this.defaultInstructions)
            {
                switch(this.defaultInstructions.toLowerCase())
                {
                    case "none":case "":
                    //do nothing
                    break;
                    default:
                        this.displayCaption(this.defaultInstructions, 7); //TODO need to make this configurable
                }
            }

        }
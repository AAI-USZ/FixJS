function() {
        // Create loading numbers string
        this.progress = this.count + ' / ' + this.total;
        
        // Create loading bar information
        this.progressPercent = (this.count / this.total).toFixed(2);
        
        // Count loaded objects
        if (this.count == this.total) {
            // turn off the animation and run the game
            this.active = false;
            this.callback(); // Set in cp.core.init
        }
    }
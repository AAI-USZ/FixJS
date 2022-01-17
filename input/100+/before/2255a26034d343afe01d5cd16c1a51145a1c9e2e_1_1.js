function(width, height, run) {
        if (this.canvas.getContext) {
            // Set context as 2D and store drawing tools for easy use
            cp.ctx = this.canvas.getContext('2d');
            
            // Setup the Canvas viewing space
            this.screen(width, height);
            
            // Start animation
            this.animate();
                        
            // Run logic upon completion of all loading
            if (run === undefined) {
                return console.log('Failure to load, no run logic given');
            }

            // Load everyting necessary with a run callback
            cp.load.callback = run;
            cp.load.init(run);
            
            // Run any extra logic added by user
            this.hookInit();
            
            // Check to see if debugging is active
            cp.debug.init();
            
            cp.audio.init();
            
            // Activate keyboard keys
            cp.input.init();
            
        } else {
            this.fail();
        }
    }
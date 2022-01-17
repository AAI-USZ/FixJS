function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        // set the walking speed
        this.setVelocity(2.5, 2.5);

        this.setFriction(0.5, 0.5);
		
        // adjust the bounding box
        this.updateColRect(10,12,16,14);

        // disable gravity
        this.gravity = 0;

        this.firstUpdates = 2;
        this.direction = 'down';
        this.destinationX = x;
        this.destinationY = y;
    }
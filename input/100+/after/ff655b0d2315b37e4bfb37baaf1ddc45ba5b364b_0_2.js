function(totalObserverTime, totalTravelerTime, totalDistance, 
                         acceleration, iterations, interval) {

        if (this.running) {
            clearInterval(this.timer);
            this.initialize();
        }

        this.running = true;

        this.x_pos = 0;
        this.iterationNumber = 0;
        this.totalIterations = iterations;
        this.totalObserverTime = totalObserverTime;
        this.totalTravelerTime = totalTravelerTime;
        this.acceleration = acceleration;
        this.totalDistance = totalDistance;
        var timer = null;
        var a = this;
        this.timer = setInterval(function() {
            a.iterate(a);
        }, interval);
    }
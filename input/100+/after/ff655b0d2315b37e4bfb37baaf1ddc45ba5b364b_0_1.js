function(parent, x_start, width) {

    
    this.initialize = function() {
        this.running = false;
        this.svg = document.getElementById(parent); 
        startTime = new Date();
        this.start = x_start;
        this.traveler_start = x_start + 70;
        this.end = this.svg.getAttribute("width") - 270;
        this.initialTimeMilliseconds = startTime.getTime();
        this.clockHeight = 40;

        elem = document.getElementById("observer-clock");
        if (elem) { 
            elem.parentNode.removeChild(elem);
        }

        elem = document.getElementById("traveler-clock");
        if (elem) { 
            elem.parentNode.removeChild(elem);
        }

        this.observer = new Clock("observer-clock", startTime, this.start, this.clockHeight);
        this.svg.appendChild(this.observer.clock);

        this.traveler = new Clock("traveler-clock", startTime, this.traveler_start + 10, 40);
        this.svg.appendChild(this.traveler.clock);
    }

    this.run  = function(totalObserverTime, totalTravelerTime, totalDistance, 
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

    this.timeIncrement = function() {
        var parameters = {};
        parameters["observer_time_elapsed"] = this.iterationNumber * 
            (this.totalObserverTime / this.totalIterations);
        parameters["observer_time"] = this.totalObserverTime;
        parameters["acceleration"] = this.acceleration;

        parameters["distance"] = calcDistance(parameters);
        parameters["velocity"] = calcVelocity(parameters);
        var traveler_time = (parameters["distance"] / this.totalDistance) * 
            this.totalTravelerTime;
        parameters["traveler_length"] = 1;
        parameters["observer_length"] = calcObserverLength(parameters);
        return {"observer_time" : parameters["observer_time_elapsed"],
                "traveler_time" : traveler_time,
                "distance" : parameters["distance"],
                "observer_length" : parameters["observer_length"]};
    }

    this.iterate = function(anim) {

        ++anim.iterationNumber;
        var parameters = anim.timeIncrement();

        anim.x_pos = (parameters["distance"] / anim.totalDistance) *
            (anim.end - anim.start) + anim.traveler_start;

        if (anim.iterationNumber >= anim.totalIterations) {
            parameters["traveler_length"] = 1;
            clearInterval(anim.timer);
        }

        anim.observer.time.setTime(
            parameters["observer_time"] * 1000 + 
                anim.initialTimeMilliseconds);

        anim.traveler.time.setTime(
            parameters["traveler_time"] * 1000 +
                anim.initialTimeMilliseconds);

        anim.observer.updatePosition(anim.observer.time,
                                     anim.start, anim.clockHeight); 

        anim.traveler.updatePosition(anim.traveler.time,
                                         anim.x_pos + 10, anim.clockHeight);
        
        document.getElementById("rocket").setAttribute("x", anim.x_pos);
        document.getElementById("rocket-g").
            setAttribute("transform", "scale(" 
                         + parameters["observer_length"] + ", 1)");
    }

}
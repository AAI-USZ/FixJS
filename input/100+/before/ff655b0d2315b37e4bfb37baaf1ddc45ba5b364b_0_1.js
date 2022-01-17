function() {
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
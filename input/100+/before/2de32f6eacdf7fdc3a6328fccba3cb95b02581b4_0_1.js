function () {

    var cv = $('#main-canvas');
    var timeStart = new Date();
    var timeLast = timeStart;
    var timeNow = timeStart;
    var deltaLast = 0;
    var deltaEver = 0;
    var particles = new Array();
    var particleNumber = 0;
    var running = false;
    var debug = false;
    var random = false;
    var ticks = 0;
    var eventQueue = new Array();
    var reader = new FileReader();
    var file;
    var fileStart = 0;
    var fileEnd = 0;
    var fileBytesPerLoad = 5000;
    var fileTimeStart = 0;

    var FRAMESPEED = 20.0;
    var EMITTER_X = 470.0;
    var EMITTER_Y = 300.0;
    var EMITTER_ATTRACTION = 1100.0;
    var EMITTER_FREQUENCY = 50;
    var MAX_PARTICLES = 10000;
    var ticker = EMITTER_FREQUENCY;

    var start = function () {
        timeStart = new Date();
        particles = new Array();
        running = true;
    }

    var startRandom = function () {
        random = true;
        start();
    }
    $("#start-random").on("click", startRandom);

    var setFile = function (evt) {
        file = evt.target.files[0];
        console.log("looking at " + file.name + " of size " + file.size + " bytes.");

        readFromFile();

        random = false;
        start();
    }
    $("#file-selector").on("change", setFile);
    startRandom();

    readFromFile = function () {
        reader = new FileReader();
        reader.onloadend = checkLoadEnd;
        fileStart = fileEnd;
        fileEnd = fileStart + fileBytesPerLoad;
        var jsonblob = file.webkitSlice(fileStart, fileEnd);
        reader.readAsBinaryString(jsonblob);
    }

    var checkLoadEnd = function (evt) {
        //console.log("checking load end", evt.target.readyState)
        if (evt.target.readyState == FileReader.DONE)
            loadedFromFile(evt.target.result);
    }

    var loadedFromFile = function (loadedString) {
        stringEvents = loadedString.split("\n");
        //console.log("loaded:", loadedString);

        //loop through finding events
        for (var i = 0; i < stringEvents.length; i++) {
            try {
                thisEvent = jQuery.parseJSON(stringEvents[i]);
                if (thisEvent !== null)
                    eventQueue.push(thisEvent);
            } catch (e) {
                //console.log("error:", e)
            }
        }

        if (fileTimeStart == 0)
            fileTimeStart = eventQueue[0].time;
        //console.log("eventQueue", eventQueue);
    }

    var mainloop = function () {
        if (running) {
            update();
            draw();
        }
    };

    var update = function () {

        timeLast = timeNow;
        timeNow = new Date();
        deltaLast = timeNow - timeLast;
        deltaEver = timeNow - timeStart;
        //console.log("update: time since last delta is " + (timeNow - timeLast)  + "ms, time since start is " + (timeNow - timeStart) + "ms");

        if (ticker <= 0) {
            if (particles.length < MAX_PARTICLES) {
                if (random)
                    particles.push(new createParticleRandom());
            }

            ticker = EMITTER_FREQUENCY;
            ticks++;
        } else {
            ticker -= deltaLast;
        }

        if (!random) {
            //check for overdue events from queue
            if (eventQueue.length > 0) {
                var checking = true;
                while (checking && eventQueue.length > 0) {
                    var nextEventTime = eventQueue[0].time;
                    //console.log("delta event time = " + (nextEventTime - fileTimeStart) + ", deltaEver = " + deltaEver);
                    if (nextEventTime - fileTimeStart <= deltaEver) {
                        thisEvent = eventQueue.shift();
                        //console.log("adding event of type " + thisEvent.type, thisEvent);
                        particles.push(new createParticle(thisEvent));
                        /*
                        if (thisEvent.type == "session_start")
                            particles.push(new createParticle(thisEvent));
                        else
                            eventForParticle(thisEvent);
                        */
                    }
                    else
                        checking = false;
                }
            } else {
                //read more events from file
                readFromFile();
            }
        }

        //stop after X ms
        //if (deltaEver > 600000)
        //    running = false;

        if (ticks % 100 == 99) {
            //console.log("100 ticks after " +deltaEver+ "ms");
            //console.log("particles.length: " +particles.length);
            ticks++;

            //clean up the particles array
            var newParticles = new Array();
            var tot = particles.length;
            for (var i = 0; i < tot; i++) {
                thisPart = particles[i];
                if (thisPart.alive)
                    newParticles.push(thisPart);
            }
            particles = newParticles;
            //console.log("newParticles.length: " + newParticles.length + ", eventQueue.length: " + eventQueue.length);

        }
    }

    var draw = function () {

        cv.clearCanvas();

        //emitter
        cv.drawArc({
            strokeStyle: "#933",
            fillStyle: "#C99",
            strokeWidth: 1,
            x: EMITTER_X, y: EMITTER_Y,
            radius: 6
        });

        //particles
        var tot = particles.length;
        for (var i = 0; i < tot; i++) {
            thisPart = particles[i];
            if (thisPart.alive) {
                updateParticle(thisPart);
                drawParticle(thisPart);
            }
        }

    }

    var updateParticle = function (particle) {
        if (deltaEver > particle.diesafter)
            particle.alive = false;

        attractTowardsEmitter(particle);
        particle.x += particle.vx;
        particle.y += particle.vy;
    }

    var drawParticle = function (particle) {
        cv.drawArc({
            fillStyle: particle.color,
            x: particle.x, y: particle.y,
            radius: particle.radius
        });
    }

    var attractTowardsEmitter = function (particle) {
        var xdist = EMITTER_X - particle.x;
        var ydist = EMITTER_Y - particle.y;
        var distanceSq = (xdist * xdist) + (ydist * ydist);
        var attraction = EMITTER_ATTRACTION / FRAMESPEED / distanceSq; //massive simplification
        var direction = Math.atan2(xdist, ydist);
        var attractionX = Math.sin(direction) * attraction;
        var attractionY = Math.cos(direction) * attraction;
        particle.vx += attractionX;
        particle.vy += attractionY;

        if (distanceSq > 372500) // outside view area
            particle.alive = false;

        if (debug) {
            console.log("now particle at [" + particle.x.toFixed(2) + "," + particle.y.toFixed(2) + "] with velocity [" + particle.vx.toFixed(2) + "," + particle.vy.toFixed(2) + "]");
            console.log("xdist: " + xdist + ", ydist: " + ydist);
            console.log("distanceSq: " + distanceSq);
            console.log("attraction: " + attraction);
            console.log("direction: " + direction);
            console.log("attractionX: " + attractionX + ", attractionY: " + attractionY);
        }
    }

    var eventForParticle = function (event) {
        //console.log("eventForParticle", event);
        var totalParticles = particles.length;
        for (var i = 0; i < totalParticles; i++) {
            if (event.user == particles[i].user) {
                console.log("found particle for user " + event.user + " at " + i);
                break;
            }
        }

    }

    var createParticle = function (event) {
        var speedlimiter = 100.0 / FRAMESPEED;
        this.x = EMITTER_X + (Math.random() * 8 - 4) * speedlimiter;
        this.y = EMITTER_Y + (Math.random() * 8 - 4) * speedlimiter;
        this.vx = (Math.random() * 2 - 1) * speedlimiter;
        this.vy = (Math.random() * 2 - 1) * speedlimiter;

        this.color = "rgba(90,90,90,0.8)";
        this.alive = true;
        this.diesafter = deltaEver + 180000;
        this.radius = 2;
        this.user = event.user;

        switch (event.type) {
            case "session_start":
            case "session_end":
                this.color = "rgba(0,255,102,0.8)";
                break;
            case "buy_in":
                this.color = "rgba(255,0,0,1.0)";
                this.radius = 3;
                this.diesafter = deltaEver + 600000;
                break;
            case "purchase":
                this.color = "rgba(0,153,255,0.8)";
                break;
            case "user":
                this.color = "rgba(255,204,0,0.8)";
                break;
            case "currency_given":
                this.color = "rgba(255,102,204,0.8)";
                break;
            case "event":
                this.color = "rgba(153,153,153,0.8)";
                this.vx = this.vx / 2;
                this.vy = this.vy / 2;
                this.radius = 1;
                this.diesafter = deltaEver + 10000;
                break;
            default:
                console.log("unmatched event.type " + event.type);
        }

        this.x += this.vx;
        this.y += this.vy;

        //console.log("created particle for user " + this.user, event); //
        if (debug)
            console.log("created particle at [" + this.x + "," + this.y + "] with velocity [" + this.vx + "," + this.vy + "]");
    }

    var createParticleRandom = function () {

        var whichEvent = Math.random() * 10 >> 0;
        var event = { user: "user" + particleNumber};
        particleNumber++;

        switch (whichEvent) {
            case 0:
                event.type = "session_start";
                break;
            case 1:
                event.type = "user";
                break;
            case 2:
                event.type = "purchase";
                break;
            case 3:
                event.type = "buy_in"
                break;
            default:
                event.type = "event";
        }

        return new createParticle(event);
    }

    var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            null;

    if (animFrame !== null) {
        var recursiveAnim = function () {
            mainloop();
            animFrame(recursiveAnim, cv);
        };

        // start the mainloop
        animFrame(recursiveAnim, cv);
    } else {
        var ONE_FRAME_TIME = 1000.0 / 60.0;
        setInterval(mainloop, ONE_FRAME_TIME);
    }

}
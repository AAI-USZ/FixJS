function () {

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
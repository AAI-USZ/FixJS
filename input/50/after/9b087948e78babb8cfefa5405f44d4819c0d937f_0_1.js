function (particle) {
        if (deltaEver > particle.diesafter)
            particle.alive = false;

        attractTowardsEmitter(particle);
        particle.x += particle.vx;
        particle.y += particle.vy;
    }
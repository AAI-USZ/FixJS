function (particle) {
        attractTowardsEmitter(particle);
        particle.x += particle.vx;
        particle.y += particle.vy;
    }
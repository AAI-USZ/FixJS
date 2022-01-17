function updateParticles(particles, springs) {
    // determine forces
    calculateRepulsion(particles);
    for (var i = 0; i < springs.length; ++i)
        springs[i].pushNpull();
    for (var i = 0; i < particles.length; ++i)
        particles[i].applyTargetForce();

    // move particles
    var totalDistance = 0.0;
    for (i = 0; i < particles.length; ++i)
        totalDistance += particles[i].move();
    return totalDistance;
}
function step() {

    var circles = document.getElementById('graph').circles;
    var arrows = document.getElementById('graph').arrows;
    var particles = new Array();
    for (var i = 0; i < circles.length; ++i)
        particles.push(circles[i].particle);
    var springs = new Array();
    for (i = 0; i < arrows.length; ++i)
        springs.push(arrows[i].spring);
    var particleMovement = updateParticles(particles, springs);

    // set new position
    for (i = 0; i < circles.length; ++i) {
        circles[i].style.left = Math.round(particles[i].x - circles[i].style.width / 2 - 30) + "px";
        circles[i].style.top = Math.round(particles[i].y - circles[i].style.height / 2) + "px";
    }
    // draw arrows
    for (i = 0; i < arrows.length; i++) {
        drawArrow(arrows[i]);
    }

    // adjust graph height
    var minHeight = 0;
    var maxHeight = 0;
    for (i = 0; i < particles.length; i++) {
        minHeight = Math.min(particles[i].y, minHeight);
        maxHeight = Math.max(particles[i].y, maxHeight);
    }
    document.getElementById('graph').style.height = Math.round(maxHeight) + "px";
    document.getElementById('graph').style.marginTop = Math.round(minHeight * -1 + 20) + "px";

    // iterate
    if (particleMovement > 0.2) {
        setTimeout("step()", 25);
    }
}
function(boid, boids, predators) {
    var v = new Vector(0,0);
    var dd = -1;

    for(var i=0; i < predators.length; ++i) {
        var diff = boid.copy().diff(predators[i]);
        var _dd = diff.length();
        if (dd < 0 && _dd < 100) {
            dd = _dd;
            v = diff;
        } else if (_dd < dd && _dd < 100) {
            dd = _dd;
            v = diff;
        }
    }
    //    if (v.x != 0 && v.y != 0) {
    //	console.log(boid.toString());
    //    }

    return v.times(0.6/dd);
}
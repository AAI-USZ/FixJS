function(direction) {
        var sinTheta = Math.sin(direction.cone);
        return new Cartesian3(
                sinTheta * Math.cos(direction.clock),
                sinTheta * Math.sin(direction.clock),
                Math.cos(direction.cone));
    }
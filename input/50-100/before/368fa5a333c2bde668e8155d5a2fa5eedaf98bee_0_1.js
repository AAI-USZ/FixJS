function arcString(end, radius, largeAngle, sweep) {
        var radii = KhanUtil.currentGraph.scaleVector(radius);
        var retstring =  "A" + radii.join(" ") + " 0 " + ( largeAngle ? 1 : 0 ) + " " +( sweep ? 1 : 0 ) + " " + scaleAndJoin(end)  ;
        return retstring;
    }
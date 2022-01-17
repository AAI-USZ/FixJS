function checkSegEqual(seg1, seg2, reason) {
    console.log("cse");
    //if this is already known
    if (eqIn([seg1, seg2], knownEqualities)) {
        return true;
    }


    for (var i = 0; i < seg1.triangles.length; i++) {
        for (var j = 0; j < seg2.triangles.length; j++) {
            // if the segments' corresponding triangles are congruent AND they're the same part of those triangles, we add
            // to the known equalities
            if (checkTriangleCongruent(seg1.triangles[i][0], seg2.triangles[j][0])
                && _.indexOf(seg1.triangles[i][0].segs, seg1) === _.indexOf(seg2.triangles[j][0].segs, seg2)) {

                if (reason === "CPCTC" || reason === "corresponding parts of congruent triangles are congruent") {
                    knownEqualities[[seg1, seg2]] = "corresponding parts of congruent triangles are congruent";
                    knownEqualities[[seg2, seg1]] = "corresponding parts of congruent triangles are congruent";
                    return true;
                }
            }
        }
    }
    return false;
}
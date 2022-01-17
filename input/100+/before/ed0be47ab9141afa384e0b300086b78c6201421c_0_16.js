function checkSegForHint(seg1, seg2, equalityObject) {
    //if this is already known
    // if(eqIn([seg1,seg2], equalityObject)){
    //     return [];
    // }


    for (var i = 0; i < seg1.triangles.length; i++) {
        for (var j = 0; j < seg2.triangles.length; j++) {
            // if the segments' corresponding triangles are congruent AND they're the same part of those triangles, we add
            // to the known equalities
            if (eqIn([seg1.triangles[i][0], seg2.triangles[j][0]], equalityObject)
                && _.indexOf(seg1, seg1.triangles[i][0].segs) === _.indexOf(seg2, seg2.triangles[j][0].segs)) {
                return [seg1.triangles[i][0], seg2.triangles[j][0]];
            }
        }
    }
    return [];
}
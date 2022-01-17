function checkSegForHint(seg1, seg2, equalityObject) {
    //if this is already known
    // if(eqIn([seg1,seg2], equalityObject)){
    //     return [];
    // }

    for (var i = 0; i < seg1.triangles.length; i++) {
        for (var j = 0; j < seg2.triangles.length; j++) {
            var index1;
            for (var k = 0; k < seg1.triangles[i][0].segs.length; k++) {
                if (seg1.triangles[i][0].segs[k].equals(seg1)) {
                    index1 = k;
                }
            }

            var index2;
            for (var k = 0; k < seg2.triangles[j][0].segs.length; k++) {
                if (seg2.triangles[j][0].segs[k].equals(seg2)) {
                    index2 = k;
                }
            }

            // if the segments' corresponding triangles are congruent AND they're the same part of those triangles, we add
            // to the known equalities
            if (eqIn([seg1.triangles[i][0], seg2.triangles[j][0]], equalityObject)
                && index1 === index2) {

                return [seg1.triangles[i][0], seg2.triangles[j][0]];
            }
        }
    }
    return [];
}
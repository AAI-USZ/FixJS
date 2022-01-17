function checkAngForHint(ang1, ang2, equalityObject) {
    // if this is already known
    // if(eqIn([ang1, ang2], equalityObject)){
    //     return [];
    // }

    // if the angles' corresponding triangles are congruent AND they're the same part of those triangles, we add
    // to the known
    for (var i = 0; i < ang1.triangles.length; i++) {
        for (var j = 0; j < ang2.triangles.length; j++) {
            if (eqIn([ang1.triangles[i][0], ang2.triangles[j][0]], equalityObject)
                && _.indexOf(ang1, ang1.triangles[i][0].angs) === _.indexOf(ang2, ang2.triangles[j][0].angs)) {
                return [ang1.triangles[i][0], ang2.triangles[j][0]];
            }
        }
    }


    //if the angles share a midpoint, and their endpoints are part of two segments, then the angles are vertical
    if (ang1.mid === ang2.mid) {
        var sharedLines = 0;
        for (var i = 0; i < SEGMENTS.length; i++) {
            if (SEGMENTS[i].equals(new Seg(ang1.end1, ang2.end1)) ||
                SEGMENTS[i].equals(new Seg(ang1.end1, ang2.end2)) ||
                SEGMENTS[i].equals(new Seg(ang1.end2, ang2.end1)) ||
                SEGMENTS[i].equals(new Seg(ang1.end2, ang2.end2))) {

                if (!isRelationPossible([SEGMENTS[i], new Seg(SEGMENTS[i].end1, ang1.mid)])) {
                    sharedLines += 1;
                }

            }
        }

        if (sharedLines === 4) {
            return "vertical angles";
        }
    }

    if (eqIn([ang1, ang2], altInteriorAngs) || eqIn([ang2, ang1], altInteriorAngs)) {
        return "alternate interior angles";
    }


    return [];

}